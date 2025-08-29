import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full " +
        (className ?? "")
      }
      {...props}
    />
  )
})

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={"aspect-square h-full w-full " + (className ?? "")}
      {...props}
    />
  )
})

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={
        "flex h-full w-full items-center justify-center rounded-full bg-muted " +
        (className ?? "")
      }
      {...props}
    />
  )
})


