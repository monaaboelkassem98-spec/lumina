import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  outline: 'border-border bg-background hover:bg-muted hover:text-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-muted hover:text-foreground',
  destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizes = {
  default: 'h-8 gap-1.5 px-2.5',
  xs: 'h-6 gap-1 rounded-md px-2 text-xs',
  sm: 'h-7 gap-1 rounded-lg px-2.5 text-xs',
  lg: 'h-9 gap-1.5 px-2.5',
  icon: 'size-8',
  'icon-xs': 'size-6 rounded-md',
  'icon-sm': 'size-7 rounded-lg',
  'icon-lg': 'size-9',
}

function buttonVariants({ variant = 'default', size = 'default', className } = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-transparent text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    variants[variant] ?? variants.default,
    sizes[size] ?? sizes.default,
    className,
  )
}

function Button({ className, variant = 'default', size = 'default', type = 'button', ...props }) {
  return (
    <button data-slot="button" type={type} className={buttonVariants({ variant, size, className })} {...props} />
  )
}

export { Button, buttonVariants }
