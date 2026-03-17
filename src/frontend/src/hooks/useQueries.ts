import { useMutation } from "@tanstack/react-query";
import { Course, EntranceExam, Stream } from "../backend";
import { useActor } from "./useActor";

export { Course, EntranceExam, Stream };

export interface LeadFormData {
  fullName: string;
  mobileNumber: string;
  district: string;
  twelfthStream: Stream;
  twelfthPercentage: number;
  interestedCourse: Course;
  needsDrccSupport: boolean;
  entranceExam: EntranceExam;
}

export function useSubmitLead() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: LeadFormData) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.submitLead(
        data.fullName,
        data.mobileNumber,
        data.district,
        data.twelfthStream,
        BigInt(data.twelfthPercentage),
        data.interestedCourse,
        data.needsDrccSupport,
        data.entranceExam,
      );
    },
  });
}
