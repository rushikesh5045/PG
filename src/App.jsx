import React, { useState, useEffect } from "react";
import {
  Building,
  DoorOpen,
  Bed,
  Wifi,
  Sparkles,
  MapPin,
  FileText,
  FileSpreadsheet,
  X,
  AlertCircle,
} from "lucide-react";

const STYLES = `
  :root {
    --system-blue: #0071e3;
    --system-blue-hover: #0077ED;
    --system-gray-bg: #f5f5f7;
    --system-text: #1d1d1f;
    --system-text-secondary: #86868b;
    --card-bg: #ffffff;
    --border-color: rgba(0, 0, 0, 0.08);
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--system-gray-bg);
    color: var(--system-text);
    -webkit-font-smoothing: antialiased;
  }

  .app-container {
    min-height: 100vh;
    padding-bottom: 80px;
  }

  /* Header Styles */
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 50;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
  }
  .header-content {
    max-width: 896px;
    margin: 0 auto;
    padding: 0 24px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin: 0;
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .divider { width: 1px; height: 24px; background: #d2d2d7; margin: 0 4px; }

  /* Buttons */
  .btn {
    padding: 10px 20px;
    border-radius: 999px;
    border: none;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn:active { transform: scale(0.96); }
  .btn-clear { background: transparent; color: var(--system-text-secondary); }
  .btn-clear:hover { background: rgba(0,0,0,0.05); color: var(--system-text); }
  .btn-dark { background: #1d1d1f; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  .btn-dark:hover { background: #000; }
  .btn-blue { background: var(--system-blue); color: white; box-shadow: 0 2px 4px rgba(0,113,227,0.2); }
  .btn-blue:hover { background: var(--system-blue-hover); }
  .btn-large { width: 100%; padding: 16px 24px; font-size: 17px; border-radius: 16px; }

  /* Main Layout */
  .main-content { max-width: 896px; margin: 0 auto; padding: 0 24px; padding-top: 120px; }
  .page-title-wrap { text-align: left; margin-bottom: 40px; }
  .page-title { font-size: 40px; font-weight: 700; letter-spacing: -1px; margin: 0 0 12px 0; }
  .page-subtitle { font-size: 17px; color: var(--system-text-secondary); margin: 0; }

  /* Section Cards */
  .section-card {
    background: var(--card-bg);
    border-radius: 24px;
    border: 1px solid var(--border-color);
    margin-bottom: 32px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    transition: box-shadow 0.3s ease;
  }
  .section-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.04); }
  .section-header {
    display: flex;
    align-items: center;
    padding: 32px 32px 8px 32px;
  }
  .section-icon-wrap {
    background: #f0f8ff;
    padding: 10px;
    border-radius: 12px;
    margin-right: 16px;
    color: var(--system-blue);
  }
  .section-title { font-size: 22px; font-weight: 600; letter-spacing: -0.5px; margin: 0; }
  .section-body { padding: 16px 32px 32px 32px; }

  /* Form Inputs */
  .grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px 32px; }
  @media (min-width: 768px) {
    .grid-2 { grid-template-columns: 1fr 1fr; }
    .page-title-wrap { text-align: left; }
    .col-span-2 { grid-column: 1 / -1; }
    .btn-wrap-export { flex-direction: row !important; }
  }
  .input-group { margin-bottom: 20px; }
  .conditional-input {
    margin-left: 24px;
    padding-left: 16px;
    border-left: 2px solid #e5e5ea;
  }
  .input-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #48484a;
  }
  .input-field {
    width: 100%;
    padding: 14px 16px;
    background-color: var(--system-gray-bg);
    border: 1px solid transparent;
    border-radius: 12px;
    font-size: 15px;
    color: var(--system-text);
    outline: none;
    transition: all 0.2s ease;
    font-family: inherit;
    appearance: none;
  }
  .input-field::placeholder { color: #a1a1a6; }
  .input-field:focus {
    background-color: #ffffff;
    border-color: var(--system-blue);
    box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
  }
  
  /* Select specific styling */
  .select-wrapper { position: relative; }
  .select-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #86868b;
  }

  /* Structural elements */
  .separator { border-top: 1px solid var(--border-color); padding-top: 24px; margin-top: 8px; }
  .col-span-2 { grid-column: span 1; } /* Base mobile */
  @media (min-width: 768px) { .col-span-2 { grid-column: 1 / -1; } }

  /* Modals and Toasts */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(5px);
    z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px;
  }
  .modal-content {
    background: white; padding: 32px; border-radius: 24px; width: 100%; max-width: 360px;
    text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    animation: zoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .modal-icon { width: 48px; height: 48px; background: #fff0f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; color: #ff3b30; }
  .modal-title { font-size: 20px; font-weight: 700; margin: 0 0 8px 0; }
  .modal-desc { font-size: 15px; color: var(--system-text-secondary); margin: 0 0 24px 0; line-height: 1.4; }
  .modal-actions { display: flex; flex-direction: column; gap: 12px; }
  .btn-danger { background: #ff3b30; color: white; width: 100%; padding: 14px; border-radius: 16px; border: none; font-size: 15px; font-weight: 500; cursor: pointer; transition: 0.2s; }
  .btn-danger:active { transform: scale(0.96); }
  .btn-cancel { background: #f2f2f7; color: var(--system-text); width: 100%; padding: 14px; border-radius: 16px; border: none; font-size: 15px; font-weight: 500; cursor: pointer; transition: 0.2s; }
  .btn-cancel:active { transform: scale(0.96); }

  .toast {
    position: fixed; top: 96px; left: 50%; transform: translateX(-50%);
    background: rgba(29, 29, 31, 0.9); color: white; padding: 12px 20px;
    border-radius: 999px; z-index: 100; display: flex; align-items: center; gap: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12); backdrop-filter: blur(8px);
    animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1); font-size: 14px; font-weight: 500;
  }
  .toast-close { background: transparent; border: none; color: #a1a1a6; cursor: pointer; display: flex; padding: 4px; margin-left: 8px; border-radius: 50%; transition: 0.2s; }
  .toast-close:hover { background: rgba(255,255,255,0.1); color: white; }

  @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }

  .footer-actions { text-align: center; padding: 32px 0 64px 0; }
  .footer-title { font-size: 24px; font-weight: 700; margin: 0 0 24px 0; }
  .btn-wrap-export { display: flex; flex-direction: column; gap: 16px; max-width: 440px; margin: 0 auto; }
  .footer-note { color: var(--system-text-secondary); font-size: 14px; margin-top: 24px; }
  .hidden-mobile { display: inline; }
  @media (max-width: 768px) {
    .hidden-mobile { display: none; }
    .divider { display: none; }
    .page-title { font-size: 32px; }
  }
`;

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  placeholder = "",
  conditional = false,
}) => {
  if (conditional && value === undefined) return null;

  return (
    <div className={`input-group ${conditional ? "conditional-input" : ""}`}>
      <label className="input-label">{label}</label>
      {type === "select" ? (
        <div className="select-wrapper">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="input-field"
          >
            <option value="">Select an option</option>
            {options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="select-icon">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
      )}
    </div>
  );
};

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="section-card">
    <div className="section-header">
      <div className="section-icon-wrap">
        <Icon size={24} />
      </div>
      <h2 className="section-title">{title}</h2>
    </div>
    <div className="section-body">{children}</div>
  </div>
);

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">
          <AlertCircle size={24} />
        </div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-desc">{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-danger">
            Clear Data
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="toast">
      <AlertCircle size={20} color="#ffcc00" />
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">
        <X size={16} />
      </button>
    </div>
  );
};

export default function App() {
  const initialState = {
    pgName: "",
    rent: "",
    securityDeposit: "",
    noticePeriod: "",

    roomSize: "",
    newConstruction: "",
    sharingType: "",
    ventilation: "",
    naturalLight: "",

    washroomAttached: "",
    studyTable: "",
    mattress: "",
    geyser: "",
    heater: "",
    fan: "",

    wifi: "",
    wifiConstant: "",
    wifiReliable: "",
    wifiLimit: "",
    wifiLimitDetails: "",
    wifiTimings: "",
    wifiTimingDetails: "",
    wifiSpeed: "",
    routerProximity: "",

    cleaningHelp: "",
    cleaningTime: "",
    cleaningPayer: "",
    cleaningIncluded: "",
    washingMachine: "",
    washingMachineIncluded: "",
    drinkingWater: "",

    mess: "",
    messCost: "",
    electricitySeparate: "",
    meterVisible: "",
    electricityDivision: "",

    distanceLevelup: "",
    distanceForum: "",
    pgLibrary: "",
    libraryCost: "",
    timeLimit: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [showClearModal, setShowClearModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Dynamically inject html2pdf for PDF generation functionality
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const exportToCSV = () => {
    const headers = [
      "PG Name",
      "Rent",
      "Security Deposit",
      "Notice Period",
      "Room Size",
      "New Construction",
      "Sharing Type",
      "Ventilation",
      "Natural Light",
      "Washroom Attached",
      "Study Table",
      "Mattress",
      "Geyser Status",
      "Heater Status",
      "Fan Status",
      "WiFi Available",
      "WiFi Constant",
      "WiFi Reliable",
      "WiFi Limit",
      "WiFi Limit Details",
      "WiFi Timings",
      "WiFi Timing Details",
      "WiFi Speed",
      "Router Proximity",
      "Cleaning Help",
      "Cleaning Time",
      "Cleaning Payer",
      "Cleaning Included",
      "Washing Machine",
      "Washing Machine Included",
      "Drinking Water",
      "Mess Available",
      "Mess Cost",
      "Electricity Separate",
      "Meter Visible",
      "Electricity Division",
      "Distance LevelupIAS",
      "Distance ForumIAS",
      "PG Library",
      "Library Cost",
      "Time Limit",
    ];

    const values = [
      formData.pgName,
      formData.rent,
      formData.securityDeposit,
      formData.noticePeriod,
      formData.roomSize,
      formData.newConstruction,
      formData.sharingType,
      formData.ventilation,
      formData.naturalLight,
      formData.washroomAttached,
      formData.studyTable,
      formData.mattress,
      formData.geyser,
      formData.heater,
      formData.fan,
      formData.wifi,
      formData.wifiConstant,
      formData.wifiReliable,
      formData.wifiLimit,
      formData.wifiLimitDetails,
      formData.wifiTimings,
      formData.wifiTimingDetails,
      formData.wifiSpeed,
      formData.routerProximity,
      formData.cleaningHelp,
      formData.cleaningTime,
      formData.cleaningPayer,
      formData.cleaningIncluded,
      formData.washingMachine,
      formData.washingMachineIncluded,
      formData.drinkingWater,
      formData.mess,
      formData.messCost,
      formData.electricitySeparate,
      formData.meterVisible,
      formData.electricityDivision,
      formData.distanceLevelup,
      formData.distanceForum,
      formData.pgLibrary,
      formData.libraryCost,
      formData.timeLimit,
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const stringVal = String(val);
      if (
        stringVal.includes(",") ||
        stringVal.includes('"') ||
        stringVal.includes("\n")
      ) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    };

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.map(escapeCSV).join(",") +
      "\n" +
      values.map(escapeCSV).join(",");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const filename = formData.pgName
      ? `${formData.pgName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_eval.csv`
      : "pg_evaluation.csv";
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    if (!window.html2pdf) {
      setToastMessage(
        "PDF tool is still loading. Please try again in a few seconds.",
      );
      return;
    }

    const element = document.createElement("div");
    element.style.padding = "30px";
    element.style.fontFamily = "Helvetica, Arial, sans-serif";
    element.style.color = "#333";
    element.style.backgroundColor = "#fff";

    let htmlContent = `
            <div style="border-bottom: 3px solid #0071e3; padding-bottom: 15px; margin-bottom: 25px;">
                <h1 style="margin: 0; color: #0071e3; font-size: 28px;">PG Evaluation Report</h1>
                <h2 style="margin: 8px 0 0 0; color: #86868b; font-size: 20px;">${formData.pgName || "Unnamed PG"}</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
                <tbody>
        `;

    const dataMapping = [
      { label: "PG Name", value: formData.pgName },
      { label: "Rent", value: formData.rent ? `₹${formData.rent}` : "" },
      {
        label: "Security Deposit",
        value: formData.securityDeposit ? `₹${formData.securityDeposit}` : "",
      },
      {
        label: "Notice Period",
        value: formData.noticePeriod ? `${formData.noticePeriod} Months` : "",
      },
      { label: "Room Size", value: formData.roomSize },
      { label: "New Construction", value: formData.newConstruction },
      { label: "Sharing Type", value: formData.sharingType },
      { label: "Ventilation", value: formData.ventilation },
      { label: "Natural Light", value: formData.naturalLight },
      { label: "Washroom Attached", value: formData.washroomAttached },
      { label: "Study Table", value: formData.studyTable },
      { label: "Mattress", value: formData.mattress },
      { label: "Geyser Status", value: formData.geyser },
      { label: "Heater Status", value: formData.heater },
      { label: "Fan Status", value: formData.fan },
      { label: "WiFi Available", value: formData.wifi },
      { label: "WiFi Constant", value: formData.wifiConstant },
      { label: "WiFi Reliable", value: formData.wifiReliable },
      { label: "WiFi Limit", value: formData.wifiLimit },
      { label: "WiFi Limit Details", value: formData.wifiLimitDetails },
      { label: "WiFi Timings", value: formData.wifiTimings },
      { label: "WiFi Timing Details", value: formData.wifiTimingDetails },
      { label: "WiFi Speed", value: formData.wifiSpeed },
      { label: "Router Proximity", value: formData.routerProximity },
      { label: "Cleaning Help", value: formData.cleaningHelp },
      { label: "Cleaning Time", value: formData.cleaningTime },
      { label: "Cleaning Payer", value: formData.cleaningPayer },
      { label: "Cleaning Included", value: formData.cleaningIncluded },
      { label: "Washing Machine", value: formData.washingMachine },
      {
        label: "Washing Machine Included",
        value: formData.washingMachineIncluded,
      },
      { label: "Drinking Water", value: formData.drinkingWater },
      { label: "Mess Available", value: formData.mess },
      {
        label: "Mess Cost",
        value: formData.messCost ? `₹${formData.messCost}` : "",
      },
      { label: "Electricity Separate", value: formData.electricitySeparate },
      { label: "Meter Visible", value: formData.meterVisible },
      { label: "Electricity Division", value: formData.electricityDivision },
      { label: "Distance to LevelupIAS", value: formData.distanceLevelup },
      { label: "Distance to ForumIAS", value: formData.distanceForum },
      { label: "PG Library", value: formData.pgLibrary },
      {
        label: "Library Cost",
        value: formData.libraryCost ? `₹${formData.libraryCost}` : "",
      },
      { label: "Time Limit", value: formData.timeLimit },
    ];

    dataMapping.forEach((item) => {
      if (item.value && item.value.toString().trim() !== "") {
        htmlContent += `
                    <tr>
                        <td style="padding: 12px 10px; font-weight: 600; color: #48484a; width: 40%; border-bottom: 1px solid #e5e5ea;">${item.label}</td>
                        <td style="padding: 12px 10px; color: #1d1d1f; border-bottom: 1px solid #e5e5ea;">${item.value}</td>
                    </tr>
                `;
      }
    });

    htmlContent += `
                </tbody>
            </table>
        `;

    element.innerHTML = htmlContent;

    const opt = {
      margin: 15,
      filename: formData.pgName
        ? `${formData.pgName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_eval.pdf`
        : "pg_evaluation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="app-container">
        <Modal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          onConfirm={() => {
            setFormData(initialState);
            setShowClearModal(false);
          }}
          title="Clear all data?"
          message="Are you sure you want to clear all the fields? This action cannot be undone."
        />

        <Toast
          isVisible={!!toastMessage}
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />

        <header className="header">
          <div className="header-content">
            <div>
              <h1 className="header-title">PG Evaluator</h1>
            </div>
            <div className="header-actions">
              <button
                onClick={() => setShowClearModal(true)}
                className="btn btn-clear"
              >
                Clear
              </button>
              <div className="divider"></div>
              <button onClick={exportToCSV} className="btn btn-dark">
                <FileSpreadsheet size={16} />
                <span className="hidden-mobile">Export CSV</span>
              </button>
              <button onClick={exportToPDF} className="btn btn-blue">
                <FileText size={16} />
                <span className="hidden-mobile">Export PDF</span>
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="page-title-wrap">
            <h1 className="page-title">How good is this PG?</h1>
            <p className="page-subtitle">
              Fill this out while inspecting to make the best choice.
            </p>
          </div>

          <SectionCard title="Basic Details" icon={Building}>
            <div className="grid-2">
              <FormInput
                label="Name of PG"
                name="pgName"
                value={formData.pgName}
                onChange={handleChange}
                placeholder="e.g. Sunrise Residency"
              />
              <FormInput
                label="What is the rent?"
                name="rent"
                type="number"
                value={formData.rent}
                onChange={handleChange}
                placeholder="₹/month"
              />
              <FormInput
                label="Security Deposit amount?"
                name="securityDeposit"
                type="number"
                value={formData.securityDeposit}
                onChange={handleChange}
                placeholder="₹"
              />
              <FormInput
                label="Notice period (in months)?"
                name="noticePeriod"
                type="number"
                value={formData.noticePeriod}
                onChange={handleChange}
                placeholder="Months"
              />
            </div>
          </SectionCard>

          <SectionCard title="Room Overview" icon={DoorOpen}>
            <div className="grid-2">
              <FormInput
                label="How big is the room?"
                name="roomSize"
                value={formData.roomSize}
                onChange={handleChange}
                placeholder="e.g. 10x12 ft or Spacious"
              />
              <FormInput
                label="Is it a new Construction?"
                name="newConstruction"
                type="select"
                options={["Yes", "No", "Partially renovated"]}
                value={formData.newConstruction}
                onChange={handleChange}
              />
              <FormInput
                label="Sharing Type?"
                name="sharingType"
                type="select"
                options={["Single", "Double", "Triple", "Quad+"]}
                value={formData.sharingType}
                onChange={handleChange}
              />
              <FormInput
                label="Ventilation quality?"
                name="ventilation"
                type="select"
                options={["Excellent", "Good", "Average", "Poor"]}
                value={formData.ventilation}
                onChange={handleChange}
              />
              <FormInput
                label="Natural light quality?"
                name="naturalLight"
                type="select"
                options={["Excellent", "Good", "Average", "Poor"]}
                value={formData.naturalLight}
                onChange={handleChange}
              />
            </div>
          </SectionCard>

          <SectionCard title="Furniture & Appliances" icon={Bed}>
            <div className="grid-2">
              <FormInput
                label="Is Washroom attached?"
                name="washroomAttached"
                type="select"
                options={["Yes", "No"]}
                value={formData.washroomAttached}
                onChange={handleChange}
              />
              <FormInput
                label="Study table and a chair?"
                name="studyTable"
                type="select"
                options={["Yes", "No"]}
                value={formData.studyTable}
                onChange={handleChange}
              />
              <FormInput
                label="Mattress provided?"
                name="mattress"
                type="select"
                options={["Yes", "No"]}
                value={formData.mattress}
                onChange={handleChange}
              />
              <FormInput
                label="Fan condition?"
                name="fan"
                type="select"
                options={["Yes, works fine", "Yes, but faulty", "No"]}
                value={formData.fan}
                onChange={handleChange}
              />
              <FormInput
                label="Room heater condition?"
                name="heater"
                type="select"
                options={["Yes, works fine", "Yes, but faulty", "No"]}
                value={formData.heater}
                onChange={handleChange}
              />
              <FormInput
                label="Geyser condition?"
                name="geyser"
                type="select"
                options={["Yes, works fine", "Yes, but faulty", "No"]}
                value={formData.geyser}
                onChange={handleChange}
              />
            </div>
          </SectionCard>

          <SectionCard title="WiFi & Connectivity" icon={Wifi}>
            <div className="grid-2">
              <FormInput
                label="Is there Wifi?"
                name="wifi"
                type="select"
                options={["Yes", "No"]}
                value={formData.wifi}
                onChange={handleChange}
              />
              <FormInput
                label="Is Wifi speed constant inside the room?"
                name="wifiConstant"
                type="select"
                options={["Yes", "No"]}
                value={formData.wifiConstant}
                onChange={handleChange}
              />
              <FormInput
                label="Is the room wifi reliable?"
                name="wifiReliable"
                type="select"
                options={["Yes", "No"]}
                value={formData.wifiReliable}
                onChange={handleChange}
              />
              <FormInput
                label="Whats the speed of wifi?"
                name="wifiSpeed"
                value={formData.wifiSpeed}
                onChange={handleChange}
                placeholder="e.g. 50 Mbps"
              />
              <FormInput
                label="Router proximity?"
                name="routerProximity"
                type="select"
                options={[
                  "Inside the room",
                  "Just outside door",
                  "Far away / Different floor",
                ]}
                value={formData.routerProximity}
                onChange={handleChange}
              />

              <div className="col-span-2 separator"></div>

              <div>
                <FormInput
                  label="Data usage limit?"
                  name="wifiLimit"
                  type="select"
                  options={["Yes", "No"]}
                  value={formData.wifiLimit}
                  onChange={handleChange}
                />
                {formData.wifiLimit === "Yes" && (
                  <FormInput
                    label="Specify limit:"
                    name="wifiLimitDetails"
                    value={formData.wifiLimitDetails}
                    onChange={handleChange}
                    conditional={true}
                  />
                )}
              </div>
              <div>
                <FormInput
                  label="Are there wifi timings?"
                  name="wifiTimings"
                  type="select"
                  options={["Yes", "No"]}
                  value={formData.wifiTimings}
                  onChange={handleChange}
                />
                {formData.wifiTimings === "Yes" && (
                  <FormInput
                    label="Specify timings:"
                    name="wifiTimingDetails"
                    value={formData.wifiTimingDetails}
                    onChange={handleChange}
                    conditional={true}
                  />
                )}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Maintenance & Amenities" icon={Sparkles}>
            <div className="grid-2">
              <FormInput
                label="Drinking water provided?"
                name="drinkingWater"
                type="select"
                options={["Yes", "No"]}
                value={formData.drinkingWater}
                onChange={handleChange}
              />

              <div>
                <FormInput
                  label="Washing machine available?"
                  name="washingMachine"
                  type="select"
                  options={["Yes", "No"]}
                  value={formData.washingMachine}
                  onChange={handleChange}
                />
                {formData.washingMachine === "Yes" && (
                  <FormInput
                    label="Washing machine cost?"
                    name="washingMachineIncluded"
                    type="select"
                    options={["Included in rent", "Add-on (Extra cost)"]}
                    value={formData.washingMachineIncluded}
                    onChange={handleChange}
                    conditional={true}
                  />
                )}
              </div>

              <div className="col-span-2 separator"></div>

              <div className="col-span-2">
                <FormInput
                  label="Cleaning help available?"
                  name="cleaningHelp"
                  type="select"
                  options={["Yes", "No"]}
                  value={formData.cleaningHelp}
                  onChange={handleChange}
                />
                {formData.cleaningHelp === "Yes" && (
                  <div className="grid-2" style={{ marginTop: "16px" }}>
                    <FormInput
                      label="When will she come?"
                      name="cleaningTime"
                      value={formData.cleaningTime}
                      onChange={handleChange}
                      conditional={true}
                      placeholder="e.g. Daily morning"
                    />
                    <FormInput
                      label="Who pays for her?"
                      name="cleaningPayer"
                      type="select"
                      options={["Owner", "Tenant", "Shared"]}
                      value={formData.cleaningPayer}
                      onChange={handleChange}
                      conditional={true}
                    />
                    <FormInput
                      label="Included in rent?"
                      name="cleaningIncluded"
                      type="select"
                      options={["Included in rent", "Additional"]}
                      value={formData.cleaningIncluded}
                      onChange={handleChange}
                      conditional={true}
                    />
                  </div>
                )}
              </div>

              <div className="col-span-2 separator"></div>

              <div>
                <FormInput
                  label="Is mess available?"
                  name="mess"
                  type="select"
                  options={["Yes", "No"]}
                  value={formData.mess}
                  onChange={handleChange}
                />
                {formData.mess === "Yes" && (
                  <FormInput
                    label="Mess cost?"
                    name="messCost"
                    type="number"
                    value={formData.messCost}
                    onChange={handleChange}
                    conditional={true}
                    placeholder="₹/month"
                  />
                )}
              </div>
              <div>
                <FormInput
                  label="PG library available?"
                  name="pgLibrary"
                  type="select"
                  options={["Yes", "No"]}
                  value={formData.pgLibrary}
                  onChange={handleChange}
                />
                {formData.pgLibrary === "Yes" && (
                  <FormInput
                    label="Library cost?"
                    name="libraryCost"
                    type="number"
                    value={formData.libraryCost}
                    onChange={handleChange}
                    conditional={true}
                    placeholder="₹/month"
                  />
                )}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Location, Bills & Rules" icon={MapPin}>
            <div className="grid-2">
              <FormInput
                label="Electricity separate from rent?"
                name="electricitySeparate"
                type="select"
                options={["Yes", "No"]}
                value={formData.electricitySeparate}
                onChange={handleChange}
              />
              <FormInput
                label="Is meter clearly visible?"
                name="meterVisible"
                type="select"
                options={["Yes", "No", "N/A"]}
                value={formData.meterVisible}
                onChange={handleChange}
              />

              <div className="col-span-2">
                <FormInput
                  label="How is electricity bill divided?"
                  name="electricityDivision"
                  value={formData.electricityDivision}
                  onChange={handleChange}
                  placeholder="e.g. Shared equally, Per unit cost, etc."
                />
              </div>

              <FormInput
                label="Distance to LevelupIAS?"
                name="distanceLevelup"
                value={formData.distanceLevelup}
                onChange={handleChange}
                placeholder="Distance/Time (e.g. 5 min walk)"
              />
              <FormInput
                label="Distance to ForumIAS?"
                name="distanceForum"
                value={formData.distanceForum}
                onChange={handleChange}
                placeholder="Distance/Time (e.g. 2 km)"
              />

              <div
                className="col-span-2 separator"
                style={{ paddingTop: "16px" }}
              >
                <FormInput
                  label="Time limit to enter/exit PG?"
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  placeholder="e.g. Yes, gates close at 10 PM"
                />
              </div>
            </div>
          </SectionCard>

          <div className="footer-actions">
            <h3 className="footer-title">Ready to export?</h3>
            <div className="btn-wrap-export">
              <button onClick={exportToCSV} className="btn btn-dark btn-large">
                <FileSpreadsheet size={20} />
                Save as CSV
              </button>
              <button onClick={exportToPDF} className="btn btn-blue btn-large">
                <FileText size={20} />
                Save as PDF
              </button>
            </div>
            <p className="footer-note">
              Your data is completely private and saved only to your device.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
