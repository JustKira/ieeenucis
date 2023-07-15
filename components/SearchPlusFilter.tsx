"use client";
import React from "react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface SearchPlusFilterProps {
  filter?: JSX.Element;
  searchValue?: (searchValue: string) => void;
}

const SearchPlusFilter: React.FC<SearchPlusFilterProps> = ({
  filter,
  searchValue,
}) => {
  return (
    <div className="flex gap-1">
      <Input
        placeholder="search"
        onChange={(e) => {
          if (searchValue) searchValue(e.target.value);
        }}
      />
      <Dialog>
        <DialogTrigger>
          <Button>
            <Filter />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogContent>{filter}</DialogContent>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchPlusFilter;
