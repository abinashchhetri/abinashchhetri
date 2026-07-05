# Frontend Project Blueprint

> **Non-negotiable.** This is the master reference for the finance tracker frontend. Every rule here exists to protect code readability, separation of concerns, maintainability, scalability, and security. No exceptions without a documented reason.

---

## Table of Contents

1. [Stack and Tools](#1-stack-and-tools)
2. [Folder Structure](#2-folder-structure)
3. [Naming Conventions](#3-naming-conventions)
4. [Component Rules](#4-component-rules)
5. [Voice Input Component Pattern](#5-voice-input-component-pattern)
6. [Hooks — React Query](#6-hooks--react-query)
7. [API Layer](#7-api-layer)
8. [Constants](#8-constants)
9. [Types and Interfaces](#9-types-and-interfaces)
10. [Validation Schemas](#10-validation-schemas)
11. [Utilities and Helpers](#11-utilities-and-helpers)
12. [Auth — Google OAuth + JWT](#12-auth--google-oauth--jwt)
13. [Import Order and Path Aliases](#13-import-order-and-path-aliases)
14. [Comment Standard](#14-comment-standard)
15. [Security Rules](#15-security-rules)
16. [What is Forbidden](#16-what-is-forbidden)

---

## 1. Stack and Tools

| Concern | Tool |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict mode) |
| UI Components | shadcn/ui (Radix primitives) |
| Styling | Tailwind CSS |
| Data fetching / cache | TanStack React Query |
| Forms | React Hook Form + Zod |
| HTTP client | Axios |
| Auth | Google OAuth via backend redirect, JWT stored in httpOnly cookies |
| Voice input | Web Speech API (browser-native, free, no third-party cost) |
| Toasts | react-hot-toast |
| Charts | Recharts (for analytics dashboard) |

This frontend talks exclusively to the NestJS + PostgreSQL backend defined in `BACKEND_BLUEPRINT.md`. Every API call, every type, and every DTO shape on this side must mirror that backend exactly — there is one source of truth for what a "transaction" or "account" looks like, and it's the backend entity.

---

## 2. Folder Structure

```
project-root/
│
├── app/                          # Next.js App Router — pages and layouts ONLY
│   ├── (auth)/                   # Route group: login page
│   ├── (dashboard)/              # Route group: protected app pages
│   │   ├── dashboard/            # Home — today's spend, quick add, recent activity
│   │   ├── transactions/         # History — filterable transaction list
│   │   ├── accounts/             # Manage accounts (cash/bank/esewa/khalti)
│   │   ├── investments/          # NEPSE/SIP/FD portfolio
│   │   ├── analytics/            # Charts and breakdowns
│   │   └── settings/             # Default account, category management
│   ├── api/                      # Next.js API route handlers (rarely used — backend owns logic)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing/redirect page
│   ├── globals.css               # Global styles
│   └── sitemap.ts                # Dynamic sitemap
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI primitives (shadcn/radix)
│   ├── layout/                   # Navbar, Sidebar, MobileNav (used app-wide)
│   ├── shared/                   # Small shared components (Badge, Loader, EmptyState)
│   ├── voice/                    # Voice entry components — see §5
│   │   ├── VoiceRecordButton.tsx
│   │   ├── VoiceTranscriptOverlay.tsx
│   │   └── ConfirmationCard.tsx
│   ├── transactions/              # Transaction-feature components
│   ├── accounts/                  # Account-feature components
│   ├── investments/                # Investment-feature components
│   └── analytics/                  # Chart and dashboard components
│
├── hooks/                        # All custom React hooks
│   ├── context/                  # React Context hooks (auth, theme)
│   ├── voice/                    # useVoiceRecorder, useHoldToRecord — see §5
│   └── react-query/               # TanStack React Query hooks (by feature)
│       ├── accounts/
│       │   ├── get-accounts.hook.ts
│       │   ├── post-account.hook.ts
│       │   ├── update-account.hook.ts
│       │   └── delete-account.hook.ts
│       ├── transactions/
│       │   ├── get-transactions.hook.ts
│       │   ├── get-transaction.hook.ts
│       │   ├── post-transaction.hook.ts
│       │   ├── update-transaction.hook.ts
│       │   └── delete-transaction.hook.ts
│       ├── transfers/
│       ├── investments/
│       └── analytics/
│
├── services/                     # API layer — all HTTP calls live here
│   ├── index.ts                  # Axios instance + interceptors
│   ├── accounts/
│   │   └── accounts.service.ts
│   ├── transactions/
│   │   └── transactions.service.ts
│   ├── transfers/
│   │   └── transfers.service.ts
│   ├── investments/
│   │   └── investments.service.ts
│   ├── analytics/
│   │   └── analytics.service.ts
│   └── auth/
│       └── auth.service.ts
│
├── lib/                          # App-level logic, config, constants, validation
│   ├── constants/
│   │   ├── toast-messages.constants.ts   # NON-NEGOTIABLE: all toast strings here
│   │   ├── query-keys.constants.ts       # NON-NEGOTIABLE: all query keys here
│   │   ├── routes.constants.ts           # App route paths as constants
│   │   ├── auth.constants.ts             # Cookie/token key names
│   │   ├── category.constants.ts         # Default category list, icons, colors
│   │   └── voice.constants.ts            # Keyword maps for client-side voice parsing fallback
│   └── validations/
│       ├── create-transaction.validation.ts
│       ├── create-account.validation.ts
│       ├── create-transfer.validation.ts
│       └── create-investment.validation.ts
│
├── utils/                        # Pure utility/helper functions (no side effects)
│   ├── format.utils.ts            # Currency, number, date formatting (NPR)
│   ├── date.utils.ts              # Date parsing and formatting
│   ├── voice-parser.utils.ts      # Parses raw speech transcript into line items
│   └── category.utils.ts          # Client-side category icon/color lookups
│
├── types/                        # TypeScript types and interfaces
│   ├── global.types.ts            # NON-NEGOTIABLE: shared types used across 2+ features
│   ├── api.types.ts               # Generic API response/request shapes
│   ├── accounts/
│   │   └── accounts.types.ts
│   ├── transactions/
│   │   └── transactions.types.ts
│   ├── transfers/
│   │   └── transfers.types.ts
│   ├── investments/
│   │   └── investments.types.ts
│   └── analytics/
│       └── analytics.types.ts
│
├── providers/                    # React context providers (wrappers only)
│   ├── auth.provider.tsx
│   └── react-query.provider.tsx
│
└── public/
    ├── images/
    ├── icons/
    └── fonts/
```

### Rule: What goes where

| Concern | Location |
|---|---|
| Page/route rendering | `app/` |
| Reusable UI pieces | `components/` |
| Voice recording UI and logic | `components/voice/`, `hooks/voice/` |
| Data fetching logic | `hooks/react-query/` |
| All HTTP calls | `services/` |
| Toast strings | `lib/constants/toast-messages.constants.ts` |
| Query cache keys | `lib/constants/query-keys.constants.ts` |
| Form validation | `lib/validations/` |
| Pure helper functions | `utils/` |
| Voice transcript parsing logic | `utils/voice-parser.utils.ts` |
| TypeScript types | `types/` |
| Global/shared types | `types/global.types.ts` |
| Auth/context state | `providers/` + `hooks/context/` |

---

## 3. Naming Conventions

### Files

```
components/       PascalCase.tsx          TransactionCard.tsx
hooks/             kebab-case.hook.ts      get-transactions.hook.ts
services/          kebab-case.service.ts   transactions.service.ts
utils/             kebab-case.utils.ts     format.utils.ts
types/             kebab-case.types.ts     transactions.types.ts
constants/         kebab-case.constants.ts toast-messages.constants.ts
validations/       kebab-case.validation.ts create-transaction.validation.ts
```

### Variables and functions

```typescript
// Components        PascalCase
const TransactionCard = () => {}

// Query hooks        useGet prefix
const useGetTransactions = () => {}
const useGetAccountById = () => {}

// Mutation hooks     useHandle prefix
const useHandleCreateTransaction = () => {}
const useHandleUpdateAccount = () => {}
const useHandleDeleteTransaction = () => {}

// Service fns        verb + noun
const fetchTransactions = async () => {}
const createTransaction = async () => {}
const updateAccount = async () => {}
const deleteTransaction = async () => {}

// Util fns           verb + noun, camelCase
const formatCurrency = () => {}
const parseVoiceTranscript = () => {}
const getCategoryIcon = () => {}

// Interfaces/Types   I-prefix for interfaces, T-prefix for types
interface IAccount {}
interface ITransaction {}
type TApiResponse<T> = {}
type TTransactionType = "expense" | "income" | "in_transit"

// Constants          SCREAMING_SNAKE_CASE for primitives, camelCase for objects/arrays
const MAX_VOICE_RECORDING_SECONDS = 60
const TOAST_MESSAGES = {}
const QUERY_KEYS = {}
```

---

## 4. Component Rules

### NON-NEGOTIABLE: One component per file. Always.

```typescript
// ─────────────────────────────────────────────────────────────────────────────
// ComponentName
// ─────────────────────────────────────────────────────────────────────────────
// What this component does in one plain sentence.
// Any important context: when it's used, what data it needs, any gotchas.
// ─────────────────────────────────────────────────────────────────────────────

"use client"; // only if needed — remove if server component

import ...

// ─────── Types ───────────────────────────────────────────────────────────────

interface Props {
  name: string;
  isLoading?: boolean;
}

// ─────── Component ───────────────────────────────────────────────────────────

const ComponentName = ({ name, isLoading = false }: Props) => {
  return <div>{name}</div>;
};

export default ComponentName;
```

### Header comment template

```typescript
// ─────────────────────────────────────────────────────────────────────────────
// TransactionCard
// ─────────────────────────────────────────────────────────────────────────────
// Displays a single transaction row with line items, account, category badge,
// and amount. Used in the transaction history list and dashboard recent activity.
// Expects a full ITransaction object with lineItems populated — do not pass
// partial data, since the line item breakdown is the core value of this card.
// ─────────────────────────────────────────────────────────────────────────────
```

### Inline section comments (only when the block needs explanation)

```typescript
const TransactionCard = ({ transaction }: Props) => {
  // in_transit transactions never affect personal balance — show a muted style
  // so the user can visually distinguish pass-through money from real spend
  const isInTransit = transaction.type === "in_transit";

  return (
    <div className={isInTransit ? "opacity-60" : ""}>
      {/* Category badge and total amount */}
      <TransactionHeader transaction={transaction} />

      {/* Line items — only rendered for expense/income, in_transit has none */}
      {transaction.lineItems.length > 0 && (
        <LineItemsList items={transaction.lineItems} />
      )}
    </div>
  );
};
```

### Component rules checklist

- [ ] One component per file, no exceptions
- [ ] Header comment block at the top (what it does, when it's used)
- [ ] Props typed via `interface Props {}` directly above the component
- [ ] Default export for the main component
- [ ] No inline business logic — extract to utils or hooks
- [ ] No direct API calls — always go through React Query hooks
- [ ] `"use client"` directive only when state, effects, or browser APIs (mic, speech) are used

---

## 5. Voice Input Component Pattern

This is the core differentiating feature of the app. The pattern is **hold-to-record, release-to-stop** — no keyword trigger, no "done" command. Every voice-entry component follows this exact structure.

### The three pieces

```
useHoldToRecord (hook)     → manages press/hold/release state + Web Speech API lifecycle
VoiceRecordButton           → the mic button UI, wired to useHoldToRecord
ConfirmationCard             → shows parsed result, always required before saving
```

### Hook pattern

```typescript
// hooks/voice/use-hold-to-record.hook.ts
// ─────────────────────────────────────────────────────────────────────────────
// useHoldToRecord
// ─────────────────────────────────────────────────────────────────────────────
// Manages the hold-to-record gesture using the Web Speech API.
// Recording starts on pointer down, stops on pointer up — no keyword needed.
// Returns live transcript so the UI can show real-time feedback while held,
// because the SpeechRecognition API can cut off early on a pause otherwise
// going unnoticed by the user.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef, useState } from "react";

interface UseHoldToRecordReturn {
  isRecording: boolean;
  liveTranscript: string;
  startRecording: () => void;
  stopRecording: () => void;
}

export const useHoldToRecord = (): UseHoldToRecordReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setLiveTranscript(transcript);
    };

    // Auto-stop on pause is suppressed by continuous:true — restart silently
    // if the engine still ends early, so holding the button never loses audio.
    recognition.onend = () => {
      if (isRecording) recognition.start();
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  return { isRecording, liveTranscript, startRecording, stopRecording };
};
```

### Button component pattern

```typescript
// components/voice/VoiceRecordButton.tsx
// ─────────────────────────────────────────────────────────────────────────────
// VoiceRecordButton
// ─────────────────────────────────────────────────────────────────────────────
// Floating mic button. Hold to record, release to stop and trigger parsing.
// Shows the live transcript above the button while held, as a safety net
// against the speech engine mis-hearing or cutting off mid-sentence.
// On release, calls onTranscriptReady with the final transcript — the parent
// is responsible for parsing it and opening the ConfirmationCard.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { Mic } from "lucide-react";

import { useHoldToRecord } from "@/hooks/voice/use-hold-to-record.hook";

// ─────── Types ───────────────────────────────────────────────────────────────

interface Props {
  onTranscriptReady: (transcript: string) => void;
}

// ─────── Component ───────────────────────────────────────────────────────────

const VoiceRecordButton = ({ onTranscriptReady }: Props) => {
  const { isRecording, liveTranscript, startRecording, stopRecording } =
    useHoldToRecord();

  const handleRelease = () => {
    stopRecording();
    if (liveTranscript.trim()) onTranscriptReady(liveTranscript);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      {isRecording && (
        <div className="max-w-xs rounded-lg bg-background border p-3 text-sm shadow-md">
          {liveTranscript || "Listening..."}
        </div>
      )}
      <button
        onPointerDown={startRecording}
        onPointerUp={handleRelease}
        onPointerLeave={handleRelease}
        className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Hold to record an expense"
      >
        <Mic className={isRecording ? "animate-pulse" : ""} size={28} />
      </button>
    </div>
  );
};

export default VoiceRecordButton;
```

### Parsing — pure utility, no AI cost

```typescript
// utils/voice-parser.utils.ts
// ─────────────────────────────────────────────────────────────────────────────
// Voice Transcript Parser
// ─────────────────────────────────────────────────────────────────────────────
// Pure functions that turn a raw speech transcript into structured line items
// and an account guess. No AI calls — keyword and number pattern matching only,
// which keeps voice entry completely free to run.
// ─────────────────────────────────────────────────────────────────────────────

import { ACCOUNT_KEYWORDS } from "@/lib/constants/voice.constants";
import type { TParsedVoiceEntry } from "@/types/transactions/transactions.types";

// Extracts "name amount" pairs like "dal 100, milk 30" into line items
export const parseLineItems = (transcript: string) => {
  const matches = transcript.matchAll(/([a-zA-Z\u0900-\u097F]+)\s+(\d+)/g);
  return Array.from(matches).map(([, name, amount]) => ({
    name: name.trim(),
    amount: Number(amount),
  }));
};

// Detects account keyword (cash/bank/esewa/khalti) anywhere in the transcript
export const detectAccountFromTranscript = (transcript: string): string | null => {
  const lower = transcript.toLowerCase();
  const found = Object.entries(ACCOUNT_KEYWORDS).find(([, keywords]) =>
    keywords.some((keyword) => lower.includes(keyword)),
  );
  return found ? found[0] : null;
};

// Combines both into the full parsed shape the ConfirmationCard pre-fills from
export const parseVoiceTranscript = (transcript: string): TParsedVoiceEntry => ({
  lineItems: parseLineItems(transcript),
  detectedAccountType: detectAccountFromTranscript(transcript),
  rawTranscript: transcript,
});
```

### Confirmation card — mandatory before saving

```typescript
// components/voice/ConfirmationCard.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ConfirmationCard
// ─────────────────────────────────────────────────────────────────────────────
// Shows the parsed voice result for review before saving. This is the safety
// net for speech recognition errors — never let a voice entry save silently.
// Pre-fills the same form used for manual entry, so editing a line item here
// uses the exact same inputs as the manual-entry flow.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useHandleCreateTransaction } from "@/hooks/react-query/transactions/post-transaction.hook";
import type { TParsedVoiceEntry } from "@/types/transactions/transactions.types";

// ─────── Types ───────────────────────────────────────────────────────────────

interface Props {
  parsedEntry: TParsedVoiceEntry;
  accountId: string;
  onClose: () => void;
}

// ─────── Component ───────────────────────────────────────────────────────────

const ConfirmationCard = ({ parsedEntry, accountId, onClose }: Props) => {
  const [lineItems, setLineItems] = useState(parsedEntry.lineItems);
  const { handleCreateTransaction, isPending } = useHandleCreateTransaction();

  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  const handleSave = async () => {
    await handleCreateTransaction({
      accountId,
      type: "expense",
      entryMethod: "voice",
      voiceTranscript: parsedEntry.rawTranscript,
      lineItems,
    });
    onClose();
  };

  return (
    <div className="rounded-lg border bg-background p-4 shadow-md">
      {/* Line items are editable here before saving — never save unreviewed */}
      {lineItems.map((item, index) => (
        <div key={index} className="flex justify-between py-1">
          <span>{item.name}</span>
          <span>Rs. {item.amount}</span>
        </div>
      ))}
      <div className="mt-2 flex justify-between border-t pt-2 font-medium">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Discard
        </Button>
        <Button onClick={handleSave} disabled={isPending}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationCard;
```

### Voice component rules checklist

- [ ] Recording always starts on press/hold, stops on release — never on a keyword
- [ ] Live transcript is shown while recording — the user must be able to see what's being captured
- [ ] Voice parsing logic lives in `utils/voice-parser.utils.ts` as pure functions — never inline in a component
- [ ] A `ConfirmationCard` is always shown after parsing — voice entries never save silently
- [ ] The confirmation card reuses the same mutation hook as the manual form, so both entry paths produce identical data
- [ ] `SpeechRecognition` browser support is feature-detected before use — gracefully hide the mic button or fall back to the manual form if unsupported

---

## 6. Hooks — React Query

### NON-NEGOTIABLE: All query keys come from `QUERY_KEYS` constant

```typescript
// lib/constants/query-keys.constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// QUERY_KEYS
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all TanStack Query cache keys.
// Changing a key here updates every hook that uses it — no scattered strings.
// ─────────────────────────────────────────────────────────────────────────────

export const QUERY_KEYS = {
  AUTH: {
    CURRENT_USER: "current-user",
  },

  ACCOUNTS: {
    ALL: "all-accounts",
    SINGLE: (id: string) => ["account", id] as const,
    DEFAULT: "default-account",
  },

  TRANSACTIONS: {
    ALL: (filters?: Record<string, unknown>) => ["all-transactions", filters] as const,
    SINGLE: (id: string) => ["transaction", id] as const,
  },

  TRANSFERS: {
    ALL: "all-transfers",
    SINGLE: (id: string) => ["transfer", id] as const,
  },

  INVESTMENTS: {
    ALL: "all-investments",
    SINGLE: (id: string) => ["investment", id] as const,
    SUMMARY: "investments-summary",
  },

  ANALYTICS: {
    DASHBOARD: (range?: Record<string, unknown>) => ["analytics-dashboard", range] as const,
    CATEGORIES: (range?: Record<string, unknown>) => ["analytics-categories", range] as const,
    ACCOUNTS_VIEW: "analytics-accounts",
    TOP_ITEMS: (range?: Record<string, unknown>) => ["analytics-top-items", range] as const,
    ITEM_TREND: (itemName: string) => ["analytics-item-trend", itemName] as const,
    NET_WORTH: "analytics-net-worth",
  },

  CATEGORIES: {
    ALL: "all-categories",
  },
} as const;
```

### NON-NEGOTIABLE: All toast messages come from `TOAST_MESSAGES` constant

```typescript
// lib/constants/toast-messages.constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// TOAST_MESSAGES
// ─────────────────────────────────────────────────────────────────────────────
// Every user-facing toast string lives here.
// Never write a toast string inline in a hook or component.
// ─────────────────────────────────────────────────────────────────────────────

export const TOAST_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Logged in successfully",
    LOGOUT_SUCCESS: "Logged out successfully",
    SESSION_EXPIRED: "Your session has expired, please log in again",
  },

  ACCOUNTS: {
    CREATED: "Account added successfully",
    UPDATED: "Account updated",
    DELETED: "Account removed",
    DELETE_BLOCKED: "Cannot delete an account with existing transactions",
  },

  TRANSACTIONS: {
    CREATED: "Transaction saved",
    UPDATED: "Transaction updated",
    DELETED: "Transaction deleted",
    VOICE_PARSE_FAILED: "Couldn't catch that — try again or use the form",
  },

  TRANSFERS: {
    CREATED: "Transfer completed",
    DELETED: "Transfer removed",
    SAME_ACCOUNT_ERROR: "Choose two different accounts to transfer between",
  },

  INVESTMENTS: {
    CREATED: "Investment added",
    UPDATED: "Investment value updated",
    DELETED: "Investment removed",
  },

  GENERIC: {
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    SAVED: "Changes saved",
    DELETED: "Deleted successfully",
    UNAUTHORIZED: "You need to be logged in to do that",
  },
} as const;
```

### Query hook pattern

```typescript
// hooks/react-query/transactions/get-transactions.hook.ts
// ─────────────────────────────────────────────────────────────────────────────
// useGetTransactions
// ─────────────────────────────────────────────────────────────────────────────
// Fetches a paginated, filterable list of transactions for the current user.
// Filters (account, type, category, date range) are passed straight through
// to the backend query params — filtering happens server-side, not client-side.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTransactions } from "@/services/transactions/transactions.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constants";
import type { IFindAllTransactionsParams } from "@/types/transactions/transactions.types";

export const useGetTransactions = (filters: IFindAllTransactionsParams) => {
  const { data, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: QUERY_KEYS.TRANSACTIONS.ALL(filters),
    queryFn: () => fetchTransactions(filters),
  });

  return { data, isLoading, isFetching, refetch, isError };
};
```

### Mutation hook pattern

```typescript
// hooks/react-query/transactions/post-transaction.hook.ts
// ─────────────────────────────────────────────────────────────────────────────
// useHandleCreateTransaction
// ─────────────────────────────────────────────────────────────────────────────
// Creates an expense, income, or in_transit transaction — used by both the
// manual form AND the voice ConfirmationCard, so both paths share this hook.
// On success: invalidates transactions, accounts (balance changed), and
// analytics caches, since a new transaction affects all three.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createTransaction } from "@/services/transactions/transactions.service";
import { queryClient } from "@/providers/react-query.provider";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constants";
import { TOAST_MESSAGES } from "@/lib/constants/toast-messages.constants";
import type { ICreateTransaction } from "@/types/transactions/transactions.types";

export const useHandleCreateTransaction = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      // A new transaction changes account balances and every analytics view —
      // invalidate broadly rather than trying to patch the cache precisely.
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS.ALL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ACCOUNTS.ALL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ANALYTICS.DASHBOARD] });
      toast.success(TOAST_MESSAGES.TRANSACTIONS.CREATED);
    },
  });

  const handleCreateTransaction = async (body: ICreateTransaction) => {
    return mutateAsync(body);
  };

  return { handleCreateTransaction, isPending };
};
```

### Dependent hooks pattern (hook that needs data from another hook)

```typescript
// hooks/react-query/transactions/get-transaction-with-account.hook.ts
// ─────────────────────────────────────────────────────────────────────────────
// useGetTransactionWithAccount
// ─────────────────────────────────────────────────────────────────────────────
// Composed hook: fetches a transaction, then fetches its parent account.
// The account query only runs once the transaction's accountId is known.
// Use this on the transaction detail page where both pieces are shown together.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTransactionById } from "@/services/transactions/transactions.service";
import { fetchAccountById } from "@/services/accounts/accounts.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constants";

export const useGetTransactionWithAccount = (transactionId: string) => {
  const {
    data: transaction,
    isLoading: isTransactionLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.TRANSACTIONS.SINGLE(transactionId),
    queryFn: () => fetchTransactionById(transactionId),
    enabled: !!transactionId,
  });

  const {
    data: account,
    isLoading: isAccountLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.ACCOUNTS.SINGLE(transaction?.accountId!),
    queryFn: () => fetchAccountById(transaction!.accountId),
    enabled: !!transaction?.accountId,   // dependent: waits for transaction first
  });

  return {
    transaction,
    account,
    isLoading: isTransactionLoading || isAccountLoading,
  };
};
```

### Hook rules checklist

- [ ] `"use client"` at the top of every hook file
- [ ] Header comment describing what the hook does and any important behaviour
- [ ] Query keys always from `QUERY_KEYS` — never inline strings
- [ ] Toast messages always from `TOAST_MESSAGES` — never inline strings
- [ ] `enabled` guard on dependent queries so they don't fire until data is ready
- [ ] Return only what the consumer needs — no leaking internal mutation state
- [ ] `onSuccess` only handles cache invalidation and toasts — no business logic
- [ ] Mutation functions are wrapped with `handleXxx` before returning
- [ ] Error handling delegated to API interceptor — don't duplicate `toast.error` in hooks
- [ ] Any mutation that changes account balance (transactions, transfers) invalidates `ACCOUNTS.ALL` and the relevant `ANALYTICS` keys, not just its own feature's key

---

## 7. API Layer

### Structure

One service file per feature domain, mirroring the backend's module structure.

```
services/
├── index.ts                        # Axios instance + interceptors
├── auth/
│   └── auth.service.ts
├── accounts/
│   └── accounts.service.ts
├── transactions/
│   └── transactions.service.ts
├── transfers/
│   └── transfers.service.ts
├── investments/
│   └── investments.service.ts
└── analytics/
    └── analytics.service.ts
```

### Axios instance pattern

```typescript
// services/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// API Client
// ─────────────────────────────────────────────────────────────────────────────
// Single Axios instance shared across all service files.
// Auth uses httpOnly cookies set by the backend after Google OAuth — no token
// is manually attached here. withCredentials sends those cookies automatically.
// Response interceptor shows a toast for all non-GET errors automatically
// so individual hooks do not need to handle generic error messages.
// ─────────────────────────────────────────────────────────────────────────────

import axios from "axios";
import toast from "react-hot-toast";

import { TOAST_MESSAGES } from "@/lib/constants/toast-messages.constants";
import { ROUTES } from "@/lib/constants/routes.constants";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,   // sends the httpOnly JWT cookies set by the backend
});

// Global error handler — covers all non-GET failures and session expiry
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;
    const isGet = error.config?.method?.toLowerCase() === "get";

    if (status === 401) {
      toast.error(TOAST_MESSAGES.AUTH.SESSION_EXPIRED);
      window.location.href = ROUTES.LOGIN;
    } else if (!isGet) {
      toast.error(message || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG);
    }

    return Promise.reject(error?.response?.data);
  }
);

export default apiClient;
```

### Service file pattern

```typescript
// services/transactions/transactions.service.ts
// ─────────────────────────────────────────────────────────────────────────────
// Transactions Service
// ─────────────────────────────────────────────────────────────────────────────
// All HTTP calls related to transactions.
// Each function maps to one backend endpoint under /api/v1/transactions.
// No side effects — no toasts, no routing, no cache logic here.
// ─────────────────────────────────────────────────────────────────────────────

import qs from "qs";

import apiClient from "@/services";
import type {
  ITransaction,
  ICreateTransaction,
  IUpdateTransaction,
  IFindAllTransactionsParams,
} from "@/types/transactions/transactions.types";
import type { TApiResponse, TPaginatedResponse } from "@/types/api.types";

// Fetch a paginated, filterable list of the current user's transactions
export const fetchTransactions = async (
  params: IFindAllTransactionsParams
): Promise<TApiResponse<TPaginatedResponse<ITransaction>>> => {
  const query = qs.stringify(params, { skipNulls: true });
  const { data } = await apiClient.get(`/transactions?${query}`);
  return data;
};

// Fetch a single transaction with its line items
export const fetchTransactionById = async (
  id: string
): Promise<TApiResponse<ITransaction>> => {
  const { data } = await apiClient.get(`/transactions/${id}`);
  return data;
};

// Create a transaction — used by both manual form and voice ConfirmationCard
export const createTransaction = async (
  body: ICreateTransaction
): Promise<TApiResponse<ITransaction>> => {
  const { data } = await apiClient.post("/transactions", body);
  return data;
};

// Update a transaction — only note and category are editable after creation
export const updateTransaction = async ({
  transactionId,
  body,
}: {
  transactionId: string;
  body: IUpdateTransaction;
}): Promise<TApiResponse<ITransaction>> => {
  const { data } = await apiClient.patch(`/transactions/${transactionId}`, body);
  return data;
};

// Delete a transaction — backend reverses the account balance effect
export const deleteTransaction = async (transactionId: string): Promise<void> => {
  await apiClient.delete(`/transactions/${transactionId}`);
};
```

### Service rules checklist

- [ ] No toast calls — that is the interceptor's or the hook's job
- [ ] No routing or navigation
- [ ] No cache invalidation
- [ ] Every function is typed — input and output
- [ ] Header comment at the top of every service file
- [ ] One comment per function explaining what endpoint it calls
- [ ] Group related CRUD functions together in the same file
- [ ] Service function names and shapes mirror the backend controller routes exactly — if the backend has `POST /transactions`, the service has `createTransaction`, not `addTransaction` or `saveTransaction`

---

## 8. Constants

### NON-NEGOTIABLE rules

1. **Toast strings** → always in `lib/constants/toast-messages.constants.ts`
2. **Query keys** → always in `lib/constants/query-keys.constants.ts`
3. **Route paths** → always in `lib/constants/routes.constants.ts`
4. **Cookie/token names** → always in `lib/constants/auth.constants.ts`
5. **Category metadata** (icons, colors, default keyword lists) → `lib/constants/category.constants.ts`
6. **Voice parsing keyword maps** → `lib/constants/voice.constants.ts`

```typescript
// lib/constants/routes.constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────────────────────
// All app routes in one place.
// Use these when doing router.push() or building href values.
// Never write a route path string directly in a component or hook.
// ─────────────────────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/transactions",
  TRANSACTION_DETAIL: (id: string) => `/transactions/${id}`,
  ACCOUNTS: "/accounts",
  ACCOUNT_DETAIL: (id: string) => `/accounts/${id}`,
  INVESTMENTS: "/investments",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
} as const;
```

```typescript
// lib/constants/auth.constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// Auth Constants
// ─────────────────────────────────────────────────────────────────────────────
// JWT lives in httpOnly cookies set by the backend — the frontend never reads
// or stores the token value directly. These names just need to match what
// the backend sets so logout/clearing logic knows what to ask the backend to clear.
// ─────────────────────────────────────────────────────────────────────────────

export const ACCESS_TOKEN_COOKIE_NAME = "access_token";
export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
```

```typescript
// lib/constants/voice.constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// Voice Parsing Constants
// ─────────────────────────────────────────────────────────────────────────────
// Keyword maps used by utils/voice-parser.utils.ts to detect which account
// the user mentioned in a spoken transcript. Mirrors the AccountTypeEnum
// values on the backend — keep these in sync if a new account type is added.
// ─────────────────────────────────────────────────────────────────────────────

export const ACCOUNT_KEYWORDS: Record<string, string[]> = {
  cash: ["cash", "wallet"],
  bank: ["bank"],
  esewa: ["esewa", "e-sewa"],
  khalti: ["khalti"],
};
```

### Constant rules

- Primitive constants → `SCREAMING_SNAKE_CASE`
- Object/array constants → `camelCase` or `SCREAMING_SNAKE_CASE` with `as const`
- Feature-specific static data → its own named `[feature].constants.ts`, never bundled into an unrelated file

---

## 9. Types and Interfaces

### NON-NEGOTIABLE: global types live in `types/global.types.ts`

A type is "global" if it is used in more than one feature domain.

```typescript
// types/global.types.ts
// ─────────────────────────────────────────────────────────────────────────────
// Global Types
// ─────────────────────────────────────────────────────────────────────────────
// Shared types and interfaces used across two or more feature areas.
// If a type is only ever used in one feature, it belongs in that feature's
// types file, not here.
// ─────────────────────────────────────────────────────────────────────────────

// Dropdown/select option shape used in multiple forms
export interface TSelectOption {
  label: string;
  value: string;
}

// Date range filter shape — used by transactions, transfers, and analytics
export interface IDateRangeFilter {
  startDate?: string;
  endDate?: string;
}

// Account types shared across accounts, transactions, and transfers features
export type TAccountType = "cash" | "bank" | "esewa" | "khalti";

// Sorting direction used in query params
export type TSortDirection = "ASC" | "DESC";
```

```typescript
// types/api.types.ts
// ─────────────────────────────────────────────────────────────────────────────
// API Response Types
// ─────────────────────────────────────────────────────────────────────────────
// Generic wrapper shapes matching the backend's TransformInterceptor envelope
// exactly. Every API call's response is typed through one of these.
// ─────────────────────────────────────────────────────────────────────────────

export interface TApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

### Feature-scoped types

```typescript
// types/transactions/transactions.types.ts
// ─────────────────────────────────────────────────────────────────────────────
// Transaction Types
// ─────────────────────────────────────────────────────────────────────────────
// Interfaces and types scoped to the transactions feature only.
// Mirrors the backend Transaction entity and its DTOs exactly — if the
// backend adds a field, this file is the first place to update.
// ─────────────────────────────────────────────────────────────────────────────

import type { IDateRangeFilter } from "@/types/global.types";

export type TTransactionType = "expense" | "income" | "in_transit";
export type TEntryMethod = "voice" | "form";

export interface ILineItem {
  id: string;
  name: string;
  amount: number;
  autoCategory?: string;
}

export interface ITransaction {
  id: string;
  accountId: string;
  categoryId: string | null;
  type: TTransactionType;
  totalAmount: number;
  isPersonal: boolean;
  voiceTranscript: string | null;
  note: string | null;
  entryMethod: TEntryMethod;
  transactedAt: string;
  lineItems: ILineItem[];
}

// Shape for POST /transactions
export interface ICreateTransaction {
  accountId: string;
  type: TTransactionType;
  lineItems?: { name: string; amount: number }[];
  totalAmount?: number;   // only used when type is in_transit
  note?: string;
  entryMethod?: TEntryMethod;
  voiceTranscript?: string;
  transactedAt?: string;
}

// Shape for PATCH /transactions/:id — only note and category are editable
export interface IUpdateTransaction {
  note?: string;
  categoryId?: string;
}

export interface IFindAllTransactionsParams extends IDateRangeFilter {
  page?: number;
  limit?: number;
  accountId?: string;
  type?: TTransactionType;
  categoryId?: string;
  isPersonal?: boolean;
}

// Shape the voice parser produces before the ConfirmationCard pre-fills a form
export interface TParsedVoiceEntry {
  lineItems: { name: string; amount: number }[];
  detectedAccountType: string | null;
  rawTranscript: string;
}
```

### Types rules checklist

- [ ] `I` prefix for interfaces: `IAccount`, `ITransaction`
- [ ] `T` prefix for types and unions: `TTransactionType`, `TApiResponse<T>`
- [ ] No `any` — use `unknown` and narrow, or define the proper type
- [ ] Global types only in `types/global.types.ts`
- [ ] Feature types in `types/[feature]/[feature].types.ts`
- [ ] Never import a feature-specific type into another unrelated feature — go through `global.types.ts`
- [ ] Every type here must match its backend counterpart field-for-field — if the backend DTO changes, this file changes in the same PR

---

## 10. Validation Schemas

One Zod schema file per form or feature. Export named schemas.

```typescript
// lib/validations/create-transaction.validation.ts
// ─────────────────────────────────────────────────────────────────────────────
// Create Transaction Validation
// ─────────────────────────────────────────────────────────────────────────────
// Zod schema for the manual transaction entry form.
// Mirrors the backend's CreateTransactionDto validation rules so the user
// sees the same errors client-side before a request is even sent.
// ─────────────────────────────────────────────────────────────────────────────

import { z } from "zod";

const LineItemSchema = z.object({
  name: z.string().trim().min(1, "Item name is required"),
  amount: z.number().positive("Amount must be greater than 0"),
});

export const CreateTransactionSchema = z
  .object({
    accountId: z.string().uuid("Select a valid account"),
    type: z.enum(["expense", "income", "in_transit"]),
    lineItems: z.array(LineItemSchema).optional(),
    totalAmount: z.number().positive().optional(),
    note: z.string().trim().optional(),
  })
  .refine(
    (data) =>
      data.type === "in_transit"
        ? typeof data.totalAmount === "number"
        : !!data.lineItems?.length,
    {
      message: "Provide line items for expense/income, or a total for in-transit",
      path: ["lineItems"],
    },
  );

export type TCreateTransaction = z.infer<typeof CreateTransactionSchema>;
```

### Validation rules checklist

- [ ] Export the schema AND the inferred type from the same file
- [ ] One schema file per form — do not combine unrelated forms
- [ ] Use `z.infer<typeof Schema>` instead of manually duplicating interfaces
- [ ] Zod error messages should be user-readable strings, not developer codes
- [ ] Cross-field rules (like the expense vs in_transit line-items requirement above) use `.refine()` rather than splitting into separate schemas the form has to pick between

---

## 11. Utilities and Helpers

All utility functions are **pure** — same input always produces same output, no side effects.

```typescript
// utils/format.utils.ts
// ─────────────────────────────────────────────────────────────────────────────
// Format Utilities
// ─────────────────────────────────────────────────────────────────────────────
// Generic formatting helpers for currency, numbers, and dates.
// All currency is NPR — no multi-currency support in this app.
// ─────────────────────────────────────────────────────────────────────────────

// Formats a number as NPR currency — 1500 → "Rs. 1,500.00"
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    currencyDisplay: "symbol",
  }).format(amount);
};

// Formats a percentage with one decimal — 12.345 → "12.3%"
export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Truncates a long item name for display in compact UI like list rows
export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
};
```

```typescript
// utils/category.utils.ts
// ─────────────────────────────────────────────────────────────────────────────
// Category Utilities
// ─────────────────────────────────────────────────────────────────────────────
// Pure lookups for category display — icon and color by category name.
// Falls back to a generic icon/color if the category isn't in the local map,
// since custom user categories may not have a defined icon yet.
// ─────────────────────────────────────────────────────────────────────────────

import { CATEGORY_ICON_MAP, DEFAULT_CATEGORY_COLOR } from "@/lib/constants/category.constants";

export const getCategoryIcon = (categoryName: string): string => {
  return CATEGORY_ICON_MAP[categoryName] ?? "circle-dollar-sign";
};

export const getCategoryColor = (categoryName: string, fallback = DEFAULT_CATEGORY_COLOR): string => {
  return CATEGORY_ICON_MAP[categoryName] ? CATEGORY_ICON_MAP[categoryName] : fallback;
};
```

### Utils rules checklist

- [ ] Pure functions only — no API calls, no toast, no router
- [ ] Typed inputs and outputs
- [ ] Group by domain: `format.utils.ts`, `date.utils.ts`, `voice-parser.utils.ts`, `category.utils.ts`
- [ ] If a function needs to import from `hooks/` or `services/`, it is not a util — it belongs in a hook
- [ ] `voice-parser.utils.ts` never makes a network call — all parsing is local keyword/regex matching, by design, to keep voice entry free

---

## 12. Auth — Google OAuth + JWT

This frontend never handles a password and never stores a JWT in `localStorage`. The flow:

```
1. User clicks "Continue with Google" → browser navigates to
   {BACKEND_URL}/api/v1/auth/google (full page redirect, not an API call)
2. Backend handles the Google OAuth dance and redirects back to the frontend
3. Backend sets httpOnly, Secure cookies (access_token, refresh_token)
4. Frontend never reads these cookies directly — Axios sends them automatically
   via withCredentials: true on every request
5. On 401, the Axios interceptor (see §7) redirects to /login
```

### Login button pattern

```typescript
// components/shared/GoogleLoginButton.tsx
// ─────────────────────────────────────────────────────────────────────────────
// GoogleLoginButton
// ─────────────────────────────────────────────────────────────────────────────
// Triggers the Google OAuth flow via a full page redirect to the backend.
// This is NOT an Axios call — OAuth requires a real browser navigation so
// Google's consent screen can render, so this is a plain anchor/button,
// never wired through React Query or the services layer.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { Button } from "@/components/ui/button";

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return <Button onClick={handleLogin}>Continue with Google</Button>;
};

export default GoogleLoginButton;
```

### Current user hook

```typescript
// hooks/react-query/auth/get-current-user.hook.ts
// ─────────────────────────────────────────────────────────────────────────────
// useGetCurrentUser
// ─────────────────────────────────────────────────────────────────────────────
// Fetches the logged-in user's profile. Used by the auth provider to decide
// whether to render the app shell or redirect to /login. retry:false so a
// 401 here resolves quickly instead of retrying a guaranteed failure.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCurrentUser } from "@/services/auth/auth.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys.constants";

export const useGetCurrentUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.AUTH.CURRENT_USER],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  return { user: data, isLoading, isError };
};
```

### Auth rules checklist

- [ ] No password field anywhere in this app — Google OAuth only
- [ ] JWT is never read, parsed, or stored by frontend JavaScript — it lives in httpOnly cookies the backend manages
- [ ] `withCredentials: true` is set on the shared Axios instance, not per-call
- [ ] The OAuth trigger is a real navigation (`window.location.href`), never an Axios/fetch call
- [ ] A 401 anywhere in the app redirects to `/login` via the interceptor — no feature hook handles this individually
- [ ] `(dashboard)` route group pages check auth state in a layout-level guard, not per-page

---

## 13. Import Order and Path Aliases

### Path alias — always `@/` from root

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Never use relative paths (`../../`) for cross-folder imports. Always use `@/`.

### Import order (enforced by ESLint or manual discipline)

```typescript
// 1. React and Next.js built-ins
import { useState, useEffect } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// 3. Internal — hooks
import { useGetTransactions } from "@/hooks/react-query/transactions/get-transactions.hook";
import { useHoldToRecord } from "@/hooks/voice/use-hold-to-record.hook";

// 4. Internal — components
import TransactionCard from "@/components/transactions/TransactionCard";
import { Button } from "@/components/ui/button";

// 5. Internal — utils and helpers
import { formatCurrency } from "@/utils/format.utils";
import { parseVoiceTranscript } from "@/utils/voice-parser.utils";

// 6. Internal — types and interfaces
import type { ITransaction } from "@/types/transactions/transactions.types";

// 7. Internal — constants and validations
import { TOAST_MESSAGES } from "@/lib/constants/toast-messages.constants";
import { CreateTransactionSchema } from "@/lib/validations/create-transaction.validation";

// 8. Styles (last)
import styles from "./Component.module.css";
```

---

## 14. Comment Standard

### Rule: Comments explain WHY, not WHAT. Code explains what.

```typescript
// BAD — the code already says this
// Filter transactions where isPersonal is true
const personal = transactions.filter(t => t.isPersonal);

// GOOD — explains a non-obvious constraint
// in_transit transactions have isPersonal:false set by the backend —
// they must never count toward savings rate or net worth on this dashboard.
const personal = transactions.filter(t => t.isPersonal);
```

### When to write a comment

| Situation | Comment? |
|---|---|
| File-level header (what this file is, any gotcha) | Always |
| A non-obvious business rule or constraint | Yes |
| A workaround for a browser API quirk (e.g. SpeechRecognition) | Yes |
| A section break in a long component | Yes (short label) |
| Obvious code that reads itself | No |
| Code that you just wrote following a simple pattern | No |

### File-level header template

```typescript
// ─────────────────────────────────────────────────────────────────────────────
// [Name of the file/module]
// ─────────────────────────────────────────────────────────────────────────────
// One sentence: what it does.
// One sentence (optional): why, or any important constraint.
// ─────────────────────────────────────────────────────────────────────────────
```

---

## 15. Security Rules

- **Never** put secrets in code — only in `.env.local`, never committed
- **Never** store the JWT in `localStorage` or `sessionStorage` — httpOnly cookies only, managed by the backend
- **Never** log auth tokens or user PII to the console
- **Validate all user input** with Zod before sending to the API — even though the backend validates too, client-side validation gives instant feedback
- **Sanitise displayed content** — never use `dangerouslySetInnerHTML` without explicit sanitisation
- **Environment variables** — `NEXT_PUBLIC_` prefix only for values safe to expose to the browser (e.g. `NEXT_PUBLIC_API_URL`); never prefix a secret this way
- **No `eval()`**, no dynamic `require()`, no dynamic `import()` with user-controlled paths
- **Voice transcripts** containing personal info are sent to the backend over HTTPS only — never logged to the browser console in production builds

---

## 16. What is Forbidden

These rules apply to every file in the project with no exceptions.

| Forbidden | Correct approach |
|---|---|
| `toast.success("Some string")` inline in a hook | Import from `TOAST_MESSAGES` |
| `queryKey: ["some-key"]` inline in a hook | Import from `QUERY_KEYS` |
| Multiple components exported from one file | One file, one component |
| `router.push("/some-path")` inline strings | Import from `ROUTES` |
| Type `any` | Use `unknown` + narrowing, or define the proper interface |
| Direct `axios.get(...)` calls in components or hooks | Go through the service layer |
| Business logic inside a service function | Move to a hook or util |
| Toasts or routing inside a service function | Belongs in the hook `onSuccess` |
| Relative imports `../../` across feature folders | Use `@/` alias |
| Interfaces defined inside component files (unless tiny and truly local) | Move to `types/[feature]/[feature].types.ts` |
| `console.log` in committed code | Remove before committing |
| Validation logic inside a component | Move to `lib/validations/` |
| JWT stored in `localStorage`/`sessionStorage` | httpOnly cookies via the backend, `withCredentials: true` on Axios |
| A "done"/keyword-based voice trigger | Hold-to-record only — see §5 |
| Voice transcript saved directly without a `ConfirmationCard` review step | Always show the parsed result for confirmation before saving |
| An AI/LLM API call inside `voice-parser.utils.ts` | Keep parsing local keyword/regex matching — no third-party cost |
| A feature type file duplicating a shape the backend already defines differently | Keep frontend types in lockstep with the backend DTO/entity — update both together |

---

> **Last updated:** June 2026
> **Applies to:** the personal finance tracker frontend (Next.js + TypeScript + shadcn/ui)
> This blueprint is a living document — update it when a new pattern is adopted, not after the fact.