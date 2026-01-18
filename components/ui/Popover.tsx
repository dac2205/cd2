"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={`popover-content force-popover-style ${className || ""}`}
            style={{
                ...props.style,
                borderRadius: '0.5rem',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--popover-foreground))',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                padding: '1rem',
                maxWidth: '20rem',
                outline: 'none',
            }}
            {...props}
        />
    </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
