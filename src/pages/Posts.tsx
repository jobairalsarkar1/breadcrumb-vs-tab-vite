import { useState } from "react";
import { Info } from "lucide-react";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { varients } from "../constants/constant";

// Updated Types
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

interface Speciality {
  id: string;
  name: string;
  expanded: boolean;
  doctors: Doctor[];
}

interface SubCategory {
  id: string;
  name: string;
  expanded: boolean;
  specialities: Speciality[];
}

interface Category {
  id: string;
  name: string;
  expanded: boolean;
  children: SubCategory[];
}

// Updated Mock data with specialities
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
        specialities: [
          {
            id: "cardiology",
            name: "Cardiology",
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
            ],
          },
          {
            id: "nephrology",
            name: "Nephrology",
            expanded: false,
            doctors: [
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
            ],
          },
          {
            id: "neurology",
            name: "Neurology",
            expanded: false,
            doctors: [
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
            id: "paediatric",
            name: "Paediatric",
            expanded: false,
            doctors: [
              {
                id: "1552",
                name: "Dr. Emma Davis",
                specialty: "Paediatric",
                selected: false,
                appointments: [
                  {
                    id: "a11",
                    patientName: "Lily Johnson",
                    time: "9:00 AM",
                    type: "Vaccination",
                    status: "confirmed",
                  },
                  {
                    id: "a12",
                    patientName: "Noah Smith",
                    time: "11:00 AM",
                    type: "Check-up",
                    status: "pending",
                  },
                ],
              },
            ],
          },
          {
            id: "oncology",
            name: "Oncology",
            expanded: false,
            doctors: [
              {
                id: "1553",
                name: "Dr. Robert Miller",
                specialty: "Oncology",
                selected: false,
                appointments: [
                  {
                    id: "a13",
                    patientName: "Charles Wilson",
                    time: "10:30 AM",
                    type: "Chemotherapy",
                    status: "confirmed",
                  },
                  {
                    id: "a14",
                    patientName: "Grace Brown",
                    time: "2:00 PM",
                    type: "Follow-up",
                    status: "confirmed",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "surgery",
        name: "Surgery",
        expanded: false,
        specialities: [
          {
            id: "general_surgery",
            name: "General Surgery",
            expanded: false,
            doctors: [
              {
                id: "1554",
                name: "Dr. Richard Kim",
                specialty: "General Surgery",
                selected: false,
                appointments: [
                  {
                    id: "a15",
                    patientName: "Daniel Harris",
                    time: "8:00 AM",
                    type: "Pre-op",
                    status: "confirmed",
                  },
                  {
                    id: "a16",
                    patientName: "Sophia Lewis",
                    time: "12:00 PM",
                    type: "Post-op",
                    status: "confirmed",
                  },
                ],
              },
            ],
          },
          {
            id: "orthopaedic",
            name: "Orthopaedic",
            expanded: false,
            doctors: [
              {
                id: "1555",
                name: "Dr. Susan Lee",
                specialty: "Orthopaedic",
                selected: false,
                appointments: [
                  {
                    id: "a17",
                    patientName: "Mark Taylor",
                    time: "9:00 AM",
                    type: "Fracture",
                    status: "confirmed",
                  },
                  {
                    id: "a18",
                    patientName: "Anna Wilson",
                    time: "2:00 PM",
                    type: "Follow-up",
                    status: "pending",
                  },
                ],
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
        specialities: [
          {
            id: "diagnostic_radiology",
            name: "Diagnostic Radiology",
            expanded: false,
            doctors: [
              {
                id: "1556",
                name: "Dr. Patricia Moore",
                specialty: "Radiology",
                selected: false,
                appointments: [
                  {
                    id: "a19",
                    patientName: "George Allen",
                    time: "9:00 AM",
                    type: "X-ray",
                    status: "confirmed",
                  },
                  {
                    id: "a20",
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
    ],
  },
];

export default function Posts() {
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

  // Toggle speciality expansion
  const toggleSpeciality = (
    categoryId: string,
    subCategoryId: string,
    specialityId: string
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
                  specialities: sub.specialities.map((spec) =>
                    spec.id === specialityId
                      ? { ...spec, expanded: !spec.expanded }
                      : spec
                  ),
                };
              }
              return sub;
            }),
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
    specialityId: string,
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
                  specialities: sub.specialities.map((spec) => {
                    if (spec.id === specialityId) {
                      return {
                        ...spec,
                        doctors: spec.doctors.map((doc) => {
                          if (doc.id === doctorId) {
                            const updatedDoc = {
                              ...doc,
                              selected: !doc.selected,
                            };
                            return updatedDoc;
                          }
                          return doc;
                        }),
                      };
                    }
                    return spec;
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

    // Update selected doctors list
    setSelectedDoctors((prev) => {
      const isDoctorSelected = prev.some((d) => d.id === doctorId);
      if (isDoctorSelected) {
        return prev.filter((d) => d.id !== doctorId);
      } else {
        return [...prev, { ...doctor, selected: true }];
      }
    });
  };

  // Select all doctors in a speciality
  const selectAllDoctorsInSpeciality = (
    categoryId: string,
    subCategoryId: string,
    specialityId: string
  ) => {
    let updatedDoctorsList: Doctor[] = [];

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) => {
              if (sub.id === subCategoryId) {
                return {
                  ...sub,
                  specialities: sub.specialities.map((spec) => {
                    if (spec.id === specialityId) {
                      const allSelected = spec.doctors.every((d) => d.selected);
                      const updatedDoctors = spec.doctors.map((doc) => ({
                        ...doc,
                        selected: !allSelected,
                      }));

                      updatedDoctorsList = updatedDoctors;
                      return { ...spec, doctors: updatedDoctors };
                    }
                    return spec;
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

    // Update selected doctors list
    setSelectedDoctors((prev) => {
      if (updatedDoctorsList[0]?.selected) {
        // Add all doctors from this speciality
        const currentIds = new Set(prev.map((d) => d.id));
        const newDoctors = updatedDoctorsList.filter(
          (d) => !currentIds.has(d.id)
        );
        return [...prev, ...newDoctors];
      } else {
        // Remove all doctors from this speciality
        const doctorIds = updatedDoctorsList.map((d) => d.id);
        return prev.filter((d) => !doctorIds.includes(d.id));
      }
    });
  };

  // Select all doctors in a sub-category (all specialities)
  const selectAllDoctorsInSubCategory = (
    categoryId: string,
    subCategoryId: string
  ) => {
    let allDoctors: Doctor[] = [];

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) => {
              if (sub.id === subCategoryId) {
                // Check if all doctors in all specialities are selected
                const allSpecialityDoctors = sub.specialities.flatMap(
                  (spec) => spec.doctors
                );
                const allSelected = allSpecialityDoctors.every(
                  (d) => d.selected
                );

                // Update all doctors in all specialities
                const updatedSpecialities = sub.specialities.map((spec) => ({
                  ...spec,
                  doctors: spec.doctors.map((doc) => ({
                    ...doc,
                    selected: !allSelected,
                  })),
                }));

                allDoctors = updatedSpecialities.flatMap((spec) =>
                  spec.doctors.map((doc) => ({ ...doc }))
                );

                return { ...sub, specialities: updatedSpecialities };
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
      if (allDoctors[0]?.selected) {
        // Add all doctors from this sub-category
        const currentIds = new Set(prev.map((d) => d.id));
        const newDoctors = allDoctors.filter((d) => !currentIds.has(d.id));
        return [...prev, ...newDoctors];
      } else {
        // Remove all doctors from this sub-category
        const doctorIds = allDoctors.map((d) => d.id);
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
    <div className="flex h-full bg-gray-200 text-black px-3">
      {/* Fixed Sidebar */}
      <div className="w-60 border-r border-gray-200 bg-gray-200 overflow-y-auto">
        <div className="px-0.5 py-5 border-b border-gray-200 flex items-end justify-stat">
          <h2 className="text-lg font-semibold">Get Appointment</h2>
        </div>

        <div className="w-full pb-3">
          {categories.map((category, categoryIndex) => {
            const isLastCategory = categoryIndex === categories.length - 1;
            const hasChildren = category.children.length > 0;
            const isCategoryExpanded = category.expanded;

            return (
              <div key={category.id} className="mb-2">
                {/* Main Category */}
                <div
                  className="flex items-center px-0.5 py-1 rounded cursor-pointer hover:bg-gray-300/50 relative"
                  onClick={() => toggleCategory(category.id)}
                >
                  {/* Category icon */}
                  {category.expanded ? (
                    <GoTriangleDown className="w-4 h-4 mr-2 text-gray-500" />
                  ) : (
                    <GoTriangleRight className="w-4 h-4 mr-2 text-gray-500" />
                  )}
                  <span className="font-semibold text-sm">{category.name}</span>

                  {/* Vertical line for category */}
                  {(!isLastCategory || (isCategoryExpanded && hasChildren)) && (
                    <div
                      className={`absolute left-[6px] top-4 w-px bg-[#4A5565] ${
                        !isCategoryExpanded || !hasChildren ? "h-4" : "h-full"
                      }`}
                    ></div>
                  )}
                </div>

                {/* Sub-categories with connecting lines */}
                {category.expanded &&
                  category.children.map((subCategory, subIndex) => {
                    const isLastSubCategory =
                      subIndex === category.children.length - 1;
                    const hasSpecialities = subCategory.specialities.length > 0;
                    const isSubCategoryExpanded = subCategory.expanded;

                    return (
                      <div
                        key={subCategory.id}
                        className="ml-4.5 py-0 relative"
                      >
                        {/* Horizontal line connecting to sub-category */}
                        <div className="absolute left-[-9px] top-4 w-2.5 h-px bg-[#4A5565]"></div>

                        {/* Vertical line for sub-category (if not last or expanded) */}
                        {(!isLastSubCategory || isSubCategoryExpanded) && (
                          <div
                            className={`absolute left-[-9px] top-4 w-px bg-[#4A5565] ${
                              !isSubCategoryExpanded || !hasSpecialities
                                ? "h-4"
                                : "h-full"
                            }`}
                          ></div>
                        )}

                        {/* Sub-category header */}
                        <div className="flex items-center justify-between px-0 py-2 rounded hover:bg-gray-300/30">
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
                                <GoTriangleRight className="w-4 h-4 mr-2 text-gray-500" />
                              )}
                              <span className="text-xs font-medium">
                                {subCategory.name}
                              </span>
                            </div>
                          </div>

                          {/* Select All checkbox for sub-category */}
                          {hasSpecialities && (
                            <div className="flex items-center">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={subCategory.specialities
                                    .flatMap((spec) => spec.doctors)
                                    .every((d) => d.selected)}
                                  onChange={() =>
                                    selectAllDoctorsInSubCategory(
                                      category.id,
                                      subCategory.id
                                    )
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

                        {/* Specialities list */}
                        {subCategory.expanded && hasSpecialities && (
                          <div className="ml-4 relative">
                            {subCategory.specialities.map(
                              (speciality, specIndex) => {
                                const isLastSpeciality =
                                  specIndex ===
                                  subCategory.specialities.length - 1;
                                const hasDoctors =
                                  speciality.doctors.length > 0;
                                const isSpecialityExpanded =
                                  speciality.expanded;

                                return (
                                  <div
                                    key={speciality.id}
                                    className="relative py-0"
                                  >
                                    {/* Horizontal line to speciality */}
                                    <div className="absolute left-[-9px] top-4 w-2.5 h-px bg-[#4A5565]"></div>

                                    {/* Vertical line for speciality (if not last or expanded) */}
                                    {(!isLastSpeciality ||
                                      isSpecialityExpanded) && (
                                      <div
                                        className={`absolute left-[-9px] top-4 w-px bg-[#4A5565] ${
                                          !isSpecialityExpanded || !hasDoctors
                                            ? "h-4"
                                            : "h-full"
                                        }`}
                                      ></div>
                                    )}

                                    {/* Speciality header */}
                                    <div className="flex items-center justify-between px-0 py-2 rounded hover:bg-gray-300/20">
                                      <div className="flex items-center">
                                        <div
                                          className="flex items-center cursor-pointer"
                                          onClick={() =>
                                            toggleSpeciality(
                                              category.id,
                                              subCategory.id,
                                              speciality.id
                                            )
                                          }
                                        >
                                          {speciality.expanded ? (
                                            <GoTriangleDown className="w-4 h-4 mr-2 text-gray-500" />
                                          ) : (
                                            <GoTriangleRight className="w-4 h-4 mr-2 text-gray-500" />
                                          )}
                                          <span className="text-xs">
                                            {speciality.name}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Select All checkbox for speciality */}
                                      {hasDoctors && (
                                        <div className="flex items-center">
                                          <label className="flex items-center cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={speciality.doctors.every(
                                                (d) => d.selected
                                              )}
                                              onChange={() =>
                                                selectAllDoctorsInSpeciality(
                                                  category.id,
                                                  subCategory.id,
                                                  speciality.id
                                                )
                                              }
                                              className="w-3.5 h-3.5 rounded border-gray-300 accent-[#0060AE]"
                                            />
                                            <span className="ml-1 text-xs text-gray-600">
                                              All
                                            </span>
                                          </label>
                                        </div>
                                      )}
                                    </div>

                                    {/* Doctors list */}
                                    {speciality.expanded && hasDoctors && (
                                      <div className="ml-4 relative">
                                        {speciality.doctors.map(
                                          (doctor, docIndex) => {
                                            const isLastDoctor =
                                              docIndex ===
                                              speciality.doctors.length - 1;

                                            return (
                                              <div
                                                key={doctor.id}
                                                className="relative flex items-center p-2 rounded hover:bg-gray-300/10"
                                              >
                                                {/* Horizontal line to doctor */}
                                                <div className="absolute left-[-9px] top-1/2 w-3 h-px bg-[#4A5565]"></div>

                                                {/* Vertical line for doctor (if not last) */}
                                                {!isLastDoctor && (
                                                  <div
                                                    className="absolute left-[-9px] top-1/2 w-px bg-[#4A5565]"
                                                    style={{
                                                      height:
                                                        "calc(100% - 50%)",
                                                    }}
                                                  ></div>
                                                )}

                                                <label className="flex items-center cursor-pointer ml-1">
                                                  <input
                                                    type="checkbox"
                                                    checked={doctor.selected}
                                                    onChange={() =>
                                                      toggleDoctor(
                                                        category.id,
                                                        subCategory.id,
                                                        speciality.id,
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
                                          }
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-gray-200 bg-gray-200 h-[68px] flex items-center justify-end px-0 gap-6">
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
            <div className="pl-4 flex gap-3 min-w-max h-full">
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
