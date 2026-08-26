"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { events } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";
import { createFadeReveal } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import dynamic from "next/dynamic";

const ConfettiBurst = dynamic(
  () => import("@/components/ui/ConfettiBurst").then((m) => m.ConfettiBurst),
  { ssr: false }
);

const rsvpSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  guests: z.coerce.number().min(1, "At least 1 guest").max(10, "Maximum 10 guests"),
  attending: z.enum(["yes", "no", "maybe"], {
    required_error: "Please let us know if you're attending",
  }),
  events: z.array(z.string()).optional(),
  message: z.string().max(500, "Message is too long").optional(),
});

type FormData = z.infer<typeof rsvpSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export function RSVPSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  useGSAP(
    () => {
      createFadeReveal({ trigger: headingRef, reducedMotion });
    },
    { dependencies: [reducedMotion] }
  );

  const toggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get("name") as string,
      guests: formData.get("guests") as string,
      attending: formData.get("attending") as string,
      events: selectedEvents,
      message: (formData.get("message") as string) || undefined,
    };

    const result = rsvpSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setErrors({ name: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="rsvp" className="bg-primary-900/5">
      <ParticleLayer mood="night" id="rsvp-particles" />

      <div className="relative z-10 mx-auto max-w-xl section-padding">
        <div ref={headingRef} className="text-center">
          <h2 className="mb-2 font-display text-3xl text-gold-foil md:text-4xl">
            RSVP
          </h2>
          <p className="mb-4 font-body text-sm text-primary-500">
            We would be honoured by your presence
          </p>
          <OrnamentalDivider className="mx-auto mb-12 w-full max-w-xs" />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="glass-card p-10 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {!reducedMotion && <ConfettiBurst />}
              <p className="font-script text-5xl text-gold-foil">Thank You</p>
              <p className="mt-4 font-body text-primary-600">
                Your response has been received with gratitude. We cannot wait to
                celebrate with you!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card space-y-6 p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Field label="Your Name" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  className="field-input"
                  placeholder="Enter your full name"
                />
              </Field>

              <Field label="Number of Guests" error={errors.guests}>
                <input
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  className="field-input"
                />
              </Field>

              <Field label="Will you be attending?" error={errors.attending}>
                <select name="attending" className="field-input" defaultValue="">
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                  <option value="maybe">Not Sure Yet</option>
                </select>
              </Field>

              <div>
                <label className="field-label">Which events will you attend?</label>
                <div className="mt-3 space-y-2">
                  {events.map((event) => (
                    <label
                      key={event.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-secondary-200/60 px-4 py-3 transition-colors hover:border-accent-400/40"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                        className="accent-accent-500"
                      />
                      <span className="font-body text-sm text-primary-700">
                        {event.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Field label="Message / Wishes (optional)" error={errors.message}>
                <textarea
   name="message"
                  rows={4}
                  className="field-input resize-none"
                  placeholder="Share your blessings and warm wishes..."
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="btn-royal w-full disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {error && (
        <p className="mt-1 font-body text-xs text-primary-500">{error}</p>
      )}
    </div>
  );
}
