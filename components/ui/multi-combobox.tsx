import { Dispatch, FC, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiComboboxProps {
  selectedValues: string[] | undefined;
  setSelectedValues: Dispatch<SetStateAction<string[] | undefined>>;
  initValues: string[];
  options?: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  disabled?: boolean;
  width?:
    | "w-[160px]"
    | "w-[180px]"
    | "w-[200px]"
    | "w-[220px]"
    | "w-[240px]"
    | "w-[300px]"
    | "w-[320px]";
  isSearchEnabled?: boolean;
  isClearEnabled?: boolean;
}

const MultiCombobox: FC<MultiComboboxProps> = ({
  initValues,
  placeholder,
  selectedValues,
  setSelectedValues,
  disabled = false,
  width,
  options: initOptions,
  isClearEnabled = true,
  isSearchEnabled = true,
}) => {
  const options = initOptions
    ? initOptions
    : initValues.map((e) => ({
        value: e,
        label: e,
      }));

  const [open, setOpen] = useState(false);
  const valueSet = new Set(selectedValues as string[]);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between w-full border border-gray-200")}
        >
          {valueSet?.size > 0
            ? valueSet?.size === 1
              ? options.find((option) => valueSet.has(option.value))?.label
              : valueSet.size + " Selected"
            : `Select ${placeholder}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn("p-0 z-[200]", width)}
      >
        <Command>
          {isSearchEnabled && (
            <CommandInput
              className=""
              placeholder={`Search ${placeholder}...`}
            />
          )}
          <CommandEmpty>No {placeholder} found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto customScrollbar">
            {options.map((option) => {
              const isSelected = valueSet.has(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    if (isSelected) {
                      valueSet.delete(option.value);
                    } else {
                      valueSet.add(option.value);
                    }
                    const filterValues = Array.from(valueSet);
                    setSelectedValues(
                      filterValues.length ? filterValues : undefined
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
          {isClearEnabled && valueSet.size > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => setSelectedValues(undefined)}
                  className="justify-center text-center"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiCombobox;
