import { Subjects, Publisher, PaymentCreatedEvent } from "@rgsticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
