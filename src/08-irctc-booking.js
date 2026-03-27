/**
 * 🚂 IRCTC Train Ticket Booking - async/await
 */
const FARES = { SL: 250, "3A": 800, "2A": 1200, "1A": 2000 };
const VALID_CLASSES = ["SL", "3A", "2A", "1A"];

export async function checkSeatAvailability(trainNumber, date, classType) {
  await new Promise((res) => setTimeout(res, 100));
  if (!/^\d{5}$/.test(trainNumber))
    throw new Error("Invalid train number! 5 digit hona chahiye.");
  if (!VALID_CLASSES.includes(classType)) throw new Error("Invalid class type!");
  if (!date || typeof date !== "string") throw new Error("Date required hai!");

  const seats = Math.floor(Math.random() * 51); // 0-50
  const available = seats > 0;
  const waitlist = Math.floor(Math.random() * 21); // 0-20
  return { trainNumber, date, classType, available, seats, waitlist };
}

export async function bookTicket(passenger, trainNumber, date, classType) {
  if (!passenger || !passenger.name || passenger.age == null || !passenger.gender) {
    throw new Error("Invalid passenger details!");
  }
  const availability = await checkSeatAvailability(trainNumber, date, classType);
  const fare = FARES[classType];
  if (availability.available) {
    return {
      pnr: "PNR" + Math.floor(Math.random() * 1000000),
      passenger,
      trainNumber,
      date,
      class: classType,
      status: "confirmed",
      fare,
    };
  } else {
    return {
      pnr: "PNR" + Math.floor(Math.random() * 1000000),
      passenger,
      trainNumber,
      date,
      class: classType,
      status: "waitlisted",
      waitlistNumber: Math.floor(Math.random() * 20) + 1,
      fare,
    };
  }
}

export async function cancelTicket(pnr) {
  await new Promise((res) => setTimeout(res, 50));
  if (!pnr || typeof pnr !== "string" || !pnr.startsWith("PNR")) {
    throw new Error("Invalid PNR number!");
  }
  return {
    pnr,
    status: "cancelled",
    refund: Math.floor(Math.random() * 901) + 100, // 100-1000
  };
}

export async function getBookingStatus(pnr) {
  await new Promise((res) => setTimeout(res, 50));
  if (!pnr || typeof pnr !== "string" || !pnr.startsWith("PNR")) {
    throw new Error("Invalid PNR number!");
  }
  const statuses = ["confirmed", "waitlisted", "cancelled"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  return { pnr, status, lastUpdated: new Date().toISOString() };
}

export async function bookMultipleTickets(passengers, trainNumber, date, classType) {
  if (!passengers || passengers.length === 0) return [];
  const results = [];
  for (const passenger of passengers) {
    try {
      const booking = await bookTicket(passenger, trainNumber, date, classType);
      results.push(booking);
    } catch (err) {
      results.push({ passenger, error: err.message });
    }
  }
  return results;
}

export async function raceBooking(trainNumbers, passenger, date, classType) {
  const promises = trainNumbers.map((trainNumber) =>
    bookTicket(passenger, trainNumber, date, classType)
  );
  try {
    return await Promise.any(promises);
  } catch {
    throw new Error("Koi bhi train mein seat nahi mili!");
  }
}
