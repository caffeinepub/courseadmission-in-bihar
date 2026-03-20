import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    twelfthStream: Stream;
    otherCourseText?: string;
    interestedCourse: Course;
    fullName: string;
    mobileNumber: string;
    district: string;
    needsDrccSupport: boolean;
    twelfthPercentage: bigint;
    entranceExam: EntranceExam;
}
export enum Course {
    bba = "bba",
    bca = "bca",
    bsc = "bsc",
    llb = "llb",
    mba = "mba",
    other = "other",
    bcom = "bcom",
    pharmacy = "pharmacy",
    btech = "btech",
    agriculture = "agriculture",
    diploma = "diploma"
}
export enum EntranceExam {
    jee = "jee",
    cuet = "cuet",
    neet = "neet",
    none = "none"
}
export enum Stream {
    arts = "arts",
    commerce = "commerce",
    science = "science"
}
export interface backendInterface {
    getAllLeads(): Promise<Array<Lead>>;
    submitLead(fullName: string, mobileNumber: string, district: string, twelfthStream: Stream, twelfthPercentage: bigint, interestedCourse: Course, otherCourseText: string | null, needsDrccSupport: boolean, entranceExam: EntranceExam): Promise<void>;
}
