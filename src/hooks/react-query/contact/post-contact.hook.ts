// ─────────────────────────────────────────────────────────────────────────────
// useHandleContactSubmit
// ─────────────────────────────────────────────────────────────────────────────
// Submits the contact form. onSuccess/onError only handle the toast — the
// Contact section owns resetting the form.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { TOAST_MESSAGES } from "@/lib/constants/toast-messages.constants";
import type { TContactFormValues } from "@/lib/validations/contact-form.validation";
import { submitContactForm } from "@/services/contact/contact.service";

export const useHandleContactSubmit = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.CONTACT.SENT);
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.CONTACT.FAILED);
    },
  });

  const handleContactSubmit = async (body: TContactFormValues) => {
    return mutateAsync(body);
  };

  return { handleContactSubmit, isPending };
};
