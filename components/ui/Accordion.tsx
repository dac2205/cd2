"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

// Simplified class utility since we don't have tailwind-merge (or opted out)
// But wait, I can use inline styles or standard classes.
// I will use standard classes defined in components.css or inline styles combined with css modules if needed.
// For now, I'll use direct style objects + className for global utility reference.

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={`accordion-item ${className || ""}`}
        style={{ borderBottom: '1px solid hsl(var(--border))' }}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header style={{ display: 'flex' }}>
        <AccordionPrimitive.Trigger
            ref={ref}
            className={`accordion-trigger ${className || ""}`}
            style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 0',
                fontWeight: 500,
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                color: 'hsl(var(--ink-brown))',
                ...props.style // allow override
            }}
            {...props}
        >
            {children}
            <ChevronDown className="accordion-chevron" style={{ width: 16, height: 16, transition: 'transform 0.2s' }} />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={`accordion-content ${className || ""}`}
        style={{
            overflow: 'hidden',
            fontSize: '0.875rem',
            color: 'hsl(var(--ink-brown) / 0.8)',
        }}
        {...props}
    >
        <div style={{ paddingBottom: '1rem', paddingTop: '0' }}>{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
