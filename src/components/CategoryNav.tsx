import { Button } from "@/components/ui/button";
import { BookOpen, FileText, DollarSign, Users } from "lucide-react";

const categories = [
  { icon: BookOpen, label: "Bookkeeping" },
  { icon: FileText, label: "Financial Reporting" },
  { icon: DollarSign, label: "Payroll Management" },
  { icon: Users, label: "Fractional CFO Services" },
];

export const CategoryNav = () => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat, idx) => (
        <Button
          key={idx}
          variant="outline"
          className="flex items-center gap-2 whitespace-nowrap hover:border-primary hover:text-primary"
        >
          <cat.icon className="h-4 w-4" />
          {cat.label}
        </Button>
      ))}
    </div>
  );
};
