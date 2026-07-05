// ─────────────────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────────────────
// The page's closing statement — full-bleed hero-gradient-mesh band mirroring
// Slack's "every marketing page closes with a full-bleed band" rule, just
// dark instead of cream. React Hook Form + Zod validate in the browser, then
// the submit sends via EmailJS (see contact.service.ts).
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHandleContactSubmit } from "@/hooks/react-query/contact/post-contact.hook";
import { SITE } from "@/lib/constants/site.constants";
import {
  ContactFormSchema,
  type TContactFormValues,
} from "@/lib/validations/contact-form.validation";

const Contact = () => {
  const { handleContactSubmit, isPending } = useHandleContactSubmit();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (values: TContactFormValues) => {
    await handleContactSubmit(values);
    reset();
  };

  return (
    <section
      id="contact"
      className="hero-gradient-mesh flex min-h-[520px] flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8"
    >
      <p className="text-eyebrow uppercase text-accent-primary">Contact</p>
      <h2 className="mt-2 max-w-2xl text-center text-heading">Let&apos;s build something</h2>
      <p className="mt-4 max-w-xl text-center text-muted-foreground">
        Open to opportunities — reach out directly at{" "}
        <a href={`mailto:${SITE.email}`} className="text-accent-primary hover:underline">
          {SITE.email}
        </a>{" "}
        or use the form below.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-10 w-full max-w-lg rounded-md border border-hairline bg-surface-1 p-6 sm:p-8"
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="mt-4 space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="mt-4 space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={5}
            {...register("message")}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary-pill"
          size="pill"
          disabled={isPending}
          className="mt-6 w-full gap-2"
        >
          <Mail size={16} />
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </section>
  );
};

export default Contact;
