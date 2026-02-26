import {Input} from "@/components/ui/input";
import {Controller, useForm} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface FormField {
    name: string;
    type: 'text' | 'number' | 'select';
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    validate?: {
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        validate?: (value: never) => boolean | string;
    };
}

type FormProps = {
    submit: (data: any) => void;
    formFields: FormField[];
    defaultValues: Record<string, any>;
    id: string;
}

// TODO: доработать форму, чтобы она была универсальной

export default function Form ({submit, formFields, id, defaultValues }: FormProps) {
    const { register, handleSubmit, control } = useForm({defaultValues: defaultValues});

    return (
        <form  id={id} className="mt-6" onSubmit={handleSubmit(submit)}>
            {formFields.map((input) =>
                input.type === "select" as const ? (
                    <Controller
                        key={input.name}
                        name={input.name}
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={input.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {input.options?.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    ) : (
                    <Input
                        className="mb-4 last-of-type:mb-0"
                        type={input.type}
                        key={input.name}
                        {...register(input.name)}
                        placeholder={input.placeholder}
                    />
                )
            )}
        </form>
    )
}