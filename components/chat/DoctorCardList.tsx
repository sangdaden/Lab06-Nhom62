"use client";

import { useState } from "react";
import { DoctorCard } from "./DoctorCard";
import { ChevronDown } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty?: string | null;
  experience?: number | null;
  bio?: string | null;
  departmentName: string;
}

interface DoctorCardListProps {
  doctors: Doctor[];
  onSelectDoctor?: (doctorId: string, doctorName: string) => void;
}

const INITIAL_LIMIT = 3;

export function DoctorCardList({ doctors, onSelectDoctor }: DoctorCardListProps) {
  const [showAll, setShowAll] = useState(false);

  if (!doctors || doctors.length === 0) return null;

  const displayed = showAll ? doctors : doctors.slice(0, INITIAL_LIMIT);
  const remaining = doctors.length - INITIAL_LIMIT;

  return (
    <div className="flex flex-col gap-2 mt-1">
      <p className="text-xs text-vinmec-text-muted font-medium px-0.5">
        {doctors.length} bác sĩ tìm thấy
      </p>

      <div className="flex flex-col gap-2">
        {displayed.map((doc) => (
          <DoctorCard
            key={doc.id}
            {...doc}
            onSelect={
              onSelectDoctor
                ? () => onSelectDoctor(doc.id, doc.name)
                : undefined
            }
          />
        ))}
      </div>

      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="flex items-center gap-1 text-xs text-vinmec-primary hover:underline self-start px-1"
        >
          <ChevronDown size={13} />
          Xem thêm {remaining} bác sĩ
        </button>
      )}
    </div>
  );
}
