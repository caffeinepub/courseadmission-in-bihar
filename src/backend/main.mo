import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Stream = { #science; #commerce; #arts };
  type Course = { #bca; #bba; #bcom; #bsc; #diploma; #other };
  type EntranceExam = { #jee; #neet; #cuet; #none };

  type Lead = {
    fullName : Text;
    mobileNumber : Text;
    district : Text;
    twelfthStream : Stream;
    twelfthPercentage : Nat;
    interestedCourse : Course;
    needsDrccSupport : Bool;
    entranceExam : EntranceExam;
  };

  module Lead {
    public func compareByPercentage(lead1 : Lead, lead2 : Lead) : Order.Order {
      Nat.compare(lead1.twelfthPercentage, lead2.twelfthPercentage);
    };
  };

  let leads = Map.empty<Principal, Lead>();

  public shared ({ caller }) func submitLead(
    fullName : Text,
    mobileNumber : Text,
    district : Text,
    twelfthStream : Stream,
    twelfthPercentage : Nat,
    interestedCourse : Course,
    needsDrccSupport : Bool,
    entranceExam : EntranceExam,
  ) : async () {
    if (leads.containsKey(caller)) { Runtime.trap("Lead already exists") };
    let lead = {
      fullName;
      mobileNumber;
      district;
      twelfthStream;
      twelfthPercentage;
      interestedCourse;
      needsDrccSupport;
      entranceExam;
    };
    leads.add(caller, lead);
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leads.values().toArray().sort(Lead.compareByPercentage);
  };
};
