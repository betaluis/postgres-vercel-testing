import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormReturn } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
    name: "item" | "partNumber" | "description" | "price" | "availability",
    type: "input" | "checkbox" | "textarea" | "money" | "select",
    label: string,
    placeholder: string,
    form: UseFormReturn<{
        item: string;
        partNumber: string;
        description: string;
        price: number;
        availability: string;
    }, undefined>
}

export default function MyInputField({ form, name, placeholder, type, label }: Props) {

    if (type === "input") return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            value={typeof field.value === "boolean" ? field.value.toString() : field.value}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )

    if (type === "money") return (
        <FormField
            control={form.control}
            name="price"
            render={() => (
                <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            placeholder={placeholder}
                            step="any"
                            {...form.register("price", { valueAsNumber: true })}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )

    if (type === "textarea") return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            {...field}
                            value={
                                typeof field.value === 'string' || typeof field.value === 'number'
                                    ? field.value
                                    : "" // Default to empty string if value is not valid
                            }
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )

    if (type === "checkbox") return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                        <Checkbox 
                            checked={Boolean(field.value)}
                            onCheckedChange={field.onChange} 
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>{label}</FormLabel>
                    </div>
                </FormItem>
            )}
        />

    )

    if (type === "select") return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="in stock">In Stock</SelectItem>
                  <SelectItem value="out of stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
    )
}

