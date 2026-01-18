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
            className={`popover-content ${className || ""}`}
            style={{
                ...props.style,
                zIndex: 99999, // Ensure it sits on top of everything (increased)
                borderRadius: '0.5rem',
                border: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--paper-white))', // Use theme color but opaque
                color: 'hsl(var(--popover-foreground))',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)', // Stronger shadow
                padding: '1rem',
                maxWidth: '20rem',
                outline: 'none',
                opacity: 1, // Force opacity
                isolation: 'isolate' // Create new stacking context
            }}
            {...props}
        />
    </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
