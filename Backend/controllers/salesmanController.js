import { assignBeatService, getBeatsBySalesmanService,  markAttendanceService,
  markCheckoutService,
  getAllAttendanceService,  logVisitService,
  getVisitsBySalesmanService,
  getAllVisitsService,getSalesmanDashboardService} from "../services/salesmanServices.js";

// Admin assigns beat
export const assignBeat = async (req, res) => {
  try {
    const { salesmanId, area, city, pincode, beatName } = req.body;
    const beat = await assignBeatService(salesmanId, area, city, pincode, beatName);
    res.status(201).json({ success: true, message: "Beat assigned successfully", beat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  Salesman views own beats
export const getMyBeats = async (req, res) => {
  try {
    const salesmanId = req.user.id;
    const beats = await getBeatsBySalesmanService(salesmanId);
    res.json({ success: true, count: beats.length, beats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const markAttendance = async (req, res) => {
  try {
    const salesmanId = req.user.id;
    const record = await markAttendanceService(salesmanId);
    res.status(201).json({ success: true, message: "Attendance marked", record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 🕔 Check-out
export const markCheckout = async (req, res) => {
  try {
    const salesmanId = req.user.id;
    const record = await markCheckoutService(salesmanId);
    res.json({ success: true, message: "Checked out successfully", record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 🧾 Admin view all attendance
export const getAllAttendance = async (req, res) => {
  try {
    const data = await getAllAttendanceService();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// 🧾 Log a store visit
export const logVisit = async (req, res) => {
  try {
    const salesmanId = req.user.id;
    const { sellerId, beatId, remarks, feedback } = req.body;

    if (!sellerId) return res.status(400).json({ success: false, message: "Seller ID required" });

    const visit = await logVisitService(salesmanId, sellerId, beatId, remarks, feedback);
    res.status(201).json({ success: true, message: "Visit logged successfully", visit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📋 View my visits
export const getMyVisits = async (req, res) => {
  try {
    const salesmanId = req.user.id;
    const visits = await getVisitsBySalesmanService(salesmanId);
    res.json({ success: true, count: visits.length, visits });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 👁️ Admin view all salesman visits
export const getAllVisits = async (req, res) => {
  try {
    const visits = await getAllVisitsService();
    res.json({ success: true, count: visits.length, visits });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSalesmanDashboard = async (req, res) => {
  try {
    const salesmanId = req.user.id;
    const summary = await getSalesmanDashboardService(salesmanId);
    res.json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};