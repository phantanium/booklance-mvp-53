import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ACCOUNTING_SERVICES } from "@/lib/constants";

interface ServiceFiltersProps {
  onServiceTypeChange?: (value: string) => void;
  onBudgetChange?: (value: string) => void;
  onDeliveryTimeChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
}

export const ServiceFilters = ({
  onServiceTypeChange,
  onBudgetChange,
  onDeliveryTimeChange,
  onSortChange,
}: ServiceFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <Select onValueChange={onServiceTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Service options" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {ACCOUNTING_SERVICES.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onBudgetChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Budget</SelectItem>
            <SelectItem value="0-50">Under $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-200">$100 - $200</SelectItem>
            <SelectItem value="200+">$200+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onDeliveryTimeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Delivery time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Time</SelectItem>
            <SelectItem value="24">24 Hours</SelectItem>
            <SelectItem value="72">Up to 3 Days</SelectItem>
            <SelectItem value="168">Up to 7 Days</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-2">
            <Switch id="pro-services" />
            <Label htmlFor="pro-services" className="text-sm">
              Pro services
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="instant-response" />
            <Label htmlFor="instant-response" className="text-sm">
              Instant response
            </Label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">18,000+ results</p>
        <Select defaultValue="best-selling" onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="best-selling">Best Selling</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
