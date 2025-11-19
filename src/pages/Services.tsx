import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceFilters } from "@/components/ServiceFilters";
import { CategoryNav } from "@/components/CategoryNav";
import { dummyServices } from "@/lib/dummyData";
import { useState } from "react";

const Services = () => {
  const [filteredServices, setFilteredServices] = useState(dummyServices);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Accounting</h1>
          <p className="text-muted-foreground">
            Accurate accounting services to keep your finances in check
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-6">
          <CategoryNav />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ServiceFilters />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
