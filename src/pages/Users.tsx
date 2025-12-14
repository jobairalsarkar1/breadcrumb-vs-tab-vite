import { useState } from "react";
import { Info } from "lucide-react";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { varients } from "../constants/constant";

// Types (same as before)
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  selected: boolean;
  appointments: Appointment[];
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface Category {
  id: string;
  name: string;
  expanded: boolean;
  children: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  expanded: boolean;
  doctors: Doctor[];
}

// Mock data (same as before)
const initialCategories: Category[] = [
  {
    id: "clinical",
    name: "Clinical",
    expanded: false,
    children: [
      {
        id: "medicine",
        name: "Medicine",
        expanded: false,
        doctors: [
          {
            id: "1548",
            name: "Dr. Sarah Johnson",
            specialty: "Cardiology",
            selected: false,
            appointments: [
              {
                id: "a1",
                patientName: "John Doe",
                time: "9:00 AM",
                type: "Follow-up",
                status: "confirmed",
              },
              {
                id: "a2",
                patientName: "Jane Smith",
                time: "10:30 AM",
                type: "New Patient",
                status: "confirmed",
              },
              {
                id: "a3",
                patientName: "Robert Brown",
                time: "2:00 PM",
                type: "Consultation",
                status: "pending",
              },
            ],
          },
          {
            id: "1549",
            name: "Dr. Michael Chen",
            specialty: "Cardiology",
            selected: false,
            appointments: [
              {
                id: "a4",
                patientName: "Emily White",
                time: "8:30 AM",
                type: "Routine Check",
                status: "confirmed",
              },
              {
                id: "a5",
                patientName: "David Lee",
                time: "11:00 AM",
                type: "Follow-up",
                status: "confirmed",
              },
            ],
          },
          {
            id: "1550",
            name: "Dr. Lisa Wong",
            specialty: "Nephrology",
            selected: false,
            appointments: [
              {
                id: "a6",
                patientName: "Thomas Gray",
                time: "9:30 AM",
                type: "Dialysis",
                status: "confirmed",
              },
              {
                id: "a7",
                patientName: "Maria Garcia",
                time: "1:00 PM",
                type: "Consultation",
                status: "pending",
              },
            ],
          },
          {
            id: "1551",
            name: "Dr. James Wilson",
            specialty: "Neurology",
            selected: false,
            appointments: [
              {
                id: "a8",
                patientName: "Sarah Miller",
                time: "10:00 AM",
                type: "MRI Review",
                status: "confirmed",
              },
              {
                id: "a9",
                patientName: "Kevin Davis",
                time: "3:00 PM",
                type: "Follow-up",
                status: "confirmed",
              },
              {
                id: "a10",
                patientName: "Amy Taylor",
                time: "4:30 PM",
                type: "New Patient",
                status: "cancelled",
              },
            ],
          },
        ],
      },
      {
        id: "surgery",
        name: "Surgery",
        expanded: false,
        doctors: [
          {
            id: "1552",
            name: "Dr. Richard Kim",
            specialty: "General Surgery",
            selected: false,
            appointments: [
              {
                id: "a13",
                patientName: "Daniel Harris",
                time: "8:00 AM",
                type: "Pre-op",
                status: "confirmed",
              },
              {
                id: "a14",
                patientName: "Sophia Lewis",
                time: "12:00 PM",
                type: "Post-op",
                status: "confirmed",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ancillary",
    name: "Ancillary",
    expanded: false,
    children: [
      {
        id: "radiology",
        name: "Radiology",
        expanded: false,
        doctors: [
          {
            id: "1553",
            name: "Dr. Patricia Moore",
            specialty: "Radiology",
            selected: false,
            appointments: [
              {
                id: "a15",
                patientName: "George Allen",
                time: "9:00 AM",
                type: "X-ray",
                status: "confirmed",
              },
              {
                id: "a16",
                patientName: "Karen Young",
                time: "11:00 AM",
                type: "CT Scan",
                status: "confirmed",
              },
            ],
          },
          {
            id: "1554",
            name: "Dr. Alexandra Taylor",
            specialty: "Radiology",
            selected: false,
            appointments: [
              {
                id: "a16",
                patientName: "George Allen",
                time: "9:00 AM",
                type: "X-ray",
                status: "confirmed",
              },
              {
                id: "a17",
                patientName: "Karen Young",
                time: "11:00 AM",
                type: "CT Scan",
                status: "confirmed",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Users() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
      )
    );
  };

  // Toggle sub-category expansion
  const toggleSubCategory = (categoryId: string, subCategoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) =>
              sub.id === subCategoryId
                ? { ...sub, expanded: !sub.expanded }
                : sub
            ),
          };
        }
        return cat;
      })
    );
  };

  // Toggle individual doctor selection
  const toggleDoctor = (
    categoryId: string,
    subCategoryId: string,
    doctorId: string,
    doctor: Doctor
  ) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) => {
              if (sub.id === subCategoryId) {
                return {
                  ...sub,
                  doctors: sub.doctors.map((doc) => {
                    if (doc.id === doctorId) {
                      const updatedDoc = { ...doc, selected: !doc.selected };
                      return updatedDoc;
                    }
                    return doc;
                  }),
                };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );

    // Update selected doctors list directly
    setSelectedDoctors((prev) => {
      const isDoctorSelected = prev.some((d) => d.id === doctorId);
      if (isDoctorSelected) {
        return prev.filter((d) => d.id !== doctorId);
      } else {
        return [...prev, { ...doctor, selected: true }];
      }
    });
  };

  // Select all doctors in a sub-category
  const selectAllDoctors = (categoryId: string, subCategoryId: string) => {
    let updatedDoctorsList: Doctor[] = [];

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) => {
              if (sub.id === subCategoryId) {
                const allSelected = sub.doctors.every((d) => d.selected);
                const updatedDoctors = sub.doctors.map((doc) => ({
                  ...doc,
                  selected: !allSelected,
                }));

                updatedDoctorsList = updatedDoctors;
                return { ...sub, doctors: updatedDoctors };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );

    // Update selected doctors list
    setSelectedDoctors((prev) => {
      if (updatedDoctorsList[0]?.selected) {
        // Add all doctors from this sub-category
        const currentIds = new Set(prev.map((d) => d.id));
        const newDoctors = updatedDoctorsList.filter(
          (d) => !currentIds.has(d.id)
        );
        return [...prev, ...newDoctors];
      } else {
        // Remove all doctors from this sub-category
        const doctorIds = updatedDoctorsList.map((d) => d.id);
        return prev.filter((d) => !doctorIds.includes(d.id));
      }
    });
  };

  // Get status color
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-200 text-green-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="flex h-full bg-gray-200 text-black gap-3">
      {/* Fixed Sidebar */}
      <div className="w-60 border-r border-gray-200 bg-gray-200 overflow-y-auto">
        <div className="px-4 py-5 border-b border-gray-200 flex items-end justify-stat">
          <h2 className="text-lg font-semibold">Get Appointment</h2>
        </div>

        <div className="px-2 pb-3">
          {categories.map((category) => (
            <div key={category.id} className="mb-2">
              {/* Main Category */}
              <div
                className="flex items-center px-2 rounded cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                {category.expanded ? (
                  <GoTriangleDown className="w-4 h-4 mr-2 text-gray-500" />
                ) : (
                  <GoTriangleRight className="w-4 h-4 mr-2 text-gray-500" />
                )}
                <span className="font-semibold text-sm">{category.name}</span>
              </div>

              {/* Sub-categories with connecting lines */}
              {category.expanded &&
                category.children.map((subCategory, subIndex) => {
                  const isLastSubCategory =
                    subIndex === category.children.length - 1;
                  const hasChildren = subCategory.doctors.length > 0;

                  return (
                    <div key={subCategory.id} className="ml-6 py-0 relative">
                      {/* Vertical line from parent to sub-category */}
                      <div
                        className={`absolute left-[-9px] top-0 w-px bg-[#4A5565] ${
                          isLastSubCategory ? "h-4" : "h-full"
                        }`}
                      ></div>

                      {/* Horizontal line connecting to sub-category */}
                      <div className="absolute left-[-9px] top-4 w-4 h-px bg-[#4A5565]"></div>

                      {/* Sub-category header with Select All checkbox */}
                      <div className="flex items-center justify-between p-2 rounded">
                        <div className="flex items-center">
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() =>
                              toggleSubCategory(category.id, subCategory.id)
                            }
                          >
                            {subCategory.expanded ? (
                              <GoTriangleDown className="w-4 h-4 mr-2 text-gray-500" />
                            ) : (
                              <GoTriangleDown className="w-4 h-4 mr-2 text-gray-500" />
                            )}
                            <span className="text-xs font-medium">
                              {subCategory.name}
                            </span>
                          </div>
                        </div>

                        {/* Select All checkbox on the same line */}
                        {hasChildren && (
                          <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={subCategory.doctors.every(
                                  (d) => d.selected
                                )}
                                onChange={() =>
                                  selectAllDoctors(category.id, subCategory.id)
                                }
                                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#0060AE]"
                              />
                              <span className="ml-1 text-xs text-gray-600">
                                Select All
                              </span>
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Doctors list */}
                      {subCategory.expanded && hasChildren && (
                        <div className="ml-6 relative">
                          {/* Vertical line for doctors list - starts under sub-category chevron */}
                          <div
                            className={`absolute left-[-9px] top-0 w-px bg-[#4A5565] ${
                              isLastSubCategory ? "h-full" : "h-full"
                            }`}
                            style={{ top: "-8px" }}
                          ></div>

                          {/* Individual doctors */}
                          {subCategory.doctors.map((doctor, docIndex) => {
                            const isLastDoctor =
                              docIndex === subCategory.doctors.length - 1;
                            // const isLastInHierarchy =
                            //   isLastSubCategory && isLastDoctor;

                            return (
                              <div
                                key={doctor.id}
                                className="relative flex items-center p-2 rounded"
                              >
                                {/* Horizontal line to doctor */}
                                <div className="absolute left-[-9px] top-1/2 w-6 h-px bg-[#4A5565]"></div>

                                {/* Vertical line continuation for non-last items */}
                                {!isLastDoctor && (
                                  <div
                                    className="absolute left-[-9px] top-[34px] w-px bg-red-500"
                                    style={{ height: "calc(100% - 34px)" }}
                                  ></div>
                                )}

                                <label className="flex items-center cursor-pointer ml-4">
                                  <input
                                    type="checkbox"
                                    checked={doctor.selected}
                                    onChange={() =>
                                      toggleDoctor(
                                        category.id,
                                        subCategory.id,
                                        doctor.id,
                                        doctor
                                      )
                                    }
                                    className="w-3.5 h-3.5 rounded border-gray-300 accent-[#0060AE]"
                                  />
                                  <span className="ml-2 text-xs">
                                    {doctor.name}
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-gray-200 bg-gray-200 h-[68px] flex items-center justify-end px-4 gap-6">
          {varients.map((varient) => (
            <div key={varient.name} className="flex items-center gap-2">
              <div
                className={`w-3.5 h-3.5 text-sm font-medium ${varient.color}`}
              />
              <span className="text-xs tracking-wider">{varient.name}</span>
            </div>
          ))}
          <button className="text-xs px-4 py-2 bg-[#0060AE] text-white font-semibold">
            Today&apos;s Doctor List
          </button>
        </div>

        {/* Appointments Grid with Horizontal Scroll */}
        <div className="flex-1 overflow-x-auto h-[calc(100vh - 104px)]">
          {selectedDoctors.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <p className="text-lg">
                  Select doctors from the sidebar to view their appointments
                </p>
              </div>
            </div>
          ) : (
            <div className="pl-3 flex gap-3 min-w-max h-full">
              {selectedDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="w-66 h-full shrink-0 bg-[#FFFBEB] border border-gray-400"
                >
                  <div className="rounded-lg">
                    {/* Doctor Header */}
                    <div className="p-3 border-b border-gray-200 bg-[#DFEFFF]">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <h1>#{doctor.id}</h1>
                        <Info className="w-3.5 h-3.5 text-blue-800/90" />
                      </div>
                      <div className="font-semibold text-sm flex items-center justify-between">
                        <h3 className="truncate">{doctor.name}</h3>
                        <span>
                          {doctor.appointments.length > 9
                            ? doctor.appointments.length
                            : `0${doctor.appointments.length}`}
                        </span>
                      </div>
                      {/* <p className="text-sm text-gray-600">
                        {doctor.specialty}
                      </p>
                      <div className="mt-2 flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-gray-600">
                          {doctor.appointments.length} appointment(s)
                        </span>
                      </div> */}
                    </div>

                    {/* Appointments List */}
                    <div className="p-2">
                      {doctor.appointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`mb-2 px-2 py-1 bg-gray-50 border border-gray-200 rounded-xs hover:shadow-xs transition-shadow ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {/* <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">
                                {appointment.patientName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {appointment.type}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <span className="font-medium">Time:</span>
                            <span className="ml-2">{appointment.time}</span>
                          </div> */}
                          <div className="pb-1 flex items-center justify-between text-xs font-semibold tracking-wider text-gray-800">
                            <h1>{appointment.time}</h1>
                            <span>{appointment.id}</span>
                          </div>
                          <div className="w-full bg-gray-200 h-0.5" />
                          <div className="pt-1 flex items-center justify-between gap-2 text-xs font-semibold tracking-wider text-gray-800">
                            <h1 className="truncate">
                              {appointment.patientName}{" "}
                            </h1>
                            <span className="text-[10px] truncate uppercase text-white bg-gray-800 px-2 py-0.5 rounded-full">
                              {appointment.type
                                .split(/[-\s]+/)
                                .filter(Boolean)
                                .map((w) => w.slice(0, 1))
                                .join("")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
