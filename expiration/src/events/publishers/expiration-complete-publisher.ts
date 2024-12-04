import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@rgsticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
