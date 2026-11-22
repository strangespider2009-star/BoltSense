import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
const styles=cva('btn', {variants:{variant:{primary:'btn-primary',outline:'btn-outline',ghost:'btn-ghost',danger:'btn-danger'},size:{default:'',sm:'btn-sm',lg:'btn-lg',icon:'btn-icon'}},defaultVariants:{variant:'primary',size:'default'}})
interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof styles> { asChild?:boolean }
export function Button({asChild=false,className,variant,size,...props}:Props){const Comp=asChild?Slot:'button';return <Comp className={cn(styles({variant,size}),className)} {...props}/>}
