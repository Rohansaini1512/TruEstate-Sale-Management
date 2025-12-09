import React, { useState } from 'react';
import { FaChartBar, FaLink, FaFileInvoice, FaClipboardList, FaCog, FaUserCheck, FaBan, FaTimes, FaClock, FaChevronDown } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [expandedServices, setExpandedServices] = useState(false);
  const [expandedInvoices, setExpandedInvoices] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    console.log(`Selected Service: ${service}`);
  };

  const handleInvoiceClick = (invoice: string) => {
    setSelectedInvoice(invoice);
    console.log(`Selected Invoice: ${invoice}`);
  };

  return (
    <aside className="h-full w-56 bg-white border-r border-gray-200 flex flex-col shadow-md">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="bg-primary-600 text-white rounded-lg w-10 h-10 flex items-center justify-center text-xl font-bold">V</div>
        <div>
          <div className="font-semibold text-gray-900 text-base leading-tight">Vault</div>
          <div className="text-xs text-gray-500">Rohan</div>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <button type="button" className="flex w-full items-center gap-3 px-3 py-2 rounded text-gray-700 hover:bg-primary-50">
          <FaChartBar className="text-primary-600" />
          Dashboard
        </button>
        <button type="button" className="flex w-full items-center gap-3 px-3 py-2 rounded text-gray-700 hover:bg-primary-50">
          <FaLink className="text-primary-600" />
          Nexus
        </button>
        <button type="button" className="flex w-full items-center gap-3 px-3 py-2 rounded text-gray-700 hover:bg-primary-50">
          <FaClipboardList className="text-primary-600" />
          Intake
        </button>
        {/* Services Dropdown */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setExpandedServices(!expandedServices)}
            className="flex w-full items-center justify-between px-3 py-2 rounded text-gray-700 font-semibold hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <FaCog className="text-primary-600" />
              Services
            </div>
            <FaChevronDown className={`text-xs transform transition-transform ${expandedServices ? 'rotate-180' : ''}`} />
          </button>
          {expandedServices && (
            <div className="ml-8 mt-1 space-y-1 bg-gray-50 rounded p-2 border border-gray-100">
              <button
                type="button"
                onClick={() => handleServiceClick('pre-active')}
                className={`flex w-full items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition-colors ${
                  selectedService === 'pre-active' ? 'bg-primary-100 text-gray-600' : 'text-gray-600 hover:bg-white'
                }`}
              >
                <FaClock className="text-gray-400" /> Pre-active
              </button>
              <button
                type="button"
                onClick={() => handleServiceClick('active')}
                className={`flex w-full items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition-colors font-semibold ${
                  selectedService === 'active' ? 'bg-primary-100 text-primary-600' : 'text-primary-600 hover:bg-white'
                }`}
              >
                <FaUserCheck /> Active
              </button>
              <button
                type="button"
                onClick={() => handleServiceClick('blocked')}
                className={`flex w-full items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition-colors ${
                  selectedService === 'blocked' ? 'bg-red-100 text-red-500' : 'text-red-500 hover:bg-white'
                }`}
              >
                <FaBan /> Blocked
              </button>
              <button
                type="button"
                onClick={() => handleServiceClick('closed')}
                className={`flex w-full items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition-colors ${
                  selectedService === 'closed' ? 'bg-gray-200 text-gray-400' : 'text-gray-400 hover:bg-white'
                }`}
              >
                <FaTimes /> Closed
              </button>
            </div>
          )}
        </div>
        {/* Invoices Dropdown */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setExpandedInvoices(!expandedInvoices)}
            className="flex w-full items-center justify-between px-3 py-2 rounded text-gray-700 font-semibold hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <FaFileInvoice className="text-primary-600" />
              Invoices
            </div>
            <FaChevronDown className={`text-xs transform transition-transform ${expandedInvoices ? 'rotate-180' : ''}`} />
          </button>
          {expandedInvoices && (
            <div className="ml-8 mt-1 space-y-1 bg-gray-50 rounded p-2 border border-gray-100">
              <button
                type="button"
                onClick={() => handleInvoiceClick('proforma')}
                className={`flex w-full items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition-colors ${
                  selectedInvoice === 'proforma' ? 'bg-primary-100 text-primary-600' : 'text-primary-600 hover:bg-white'
                }`}
              >
                <FaFileInvoice /> Proforma Invoices
              </button>
              <button
                type="button"
                onClick={() => handleInvoiceClick('final')}
                className={`flex w-full items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition-colors ${
                  selectedInvoice === 'final' ? 'bg-gray-200 text-gray-700' : 'text-gray-700 hover:bg-white'
                }`}
              >
                <FaFileInvoice /> Final Invoices
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
