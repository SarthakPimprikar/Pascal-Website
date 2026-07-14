import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/product";
import Link from "next/link";
import { ArrowRight, Settings } from "lucide-react";
import * as LucideIcons from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsLandingPage() {
  let productsList = [];

  try {
    await connectToDatabase();
    const dbProducts = await Product.find({}).sort({ order: 1, createdAt: -1 });
    if (dbProducts && dbProducts.length > 0) {
      productsList = JSON.parse(JSON.stringify(dbProducts));
    }
  } catch (error) {
    console.error("Failed to fetch products on products index page.", error);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 animate-fade-in">
      <div className="mb-12 border-b border-slate-100 pb-6">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'Gotham, sans-serif' }}>
          Our Products Range
        </h2>
        <p className="text-slate-500 text-sm md:text-base mt-2">
          Explore our wide range of custom industrial machinery, SPMs, hydraulic systems, and assembly line fixtures.
        </p>
      </div>

      {productsList.length === 0 ? (
        <p className="text-slate-500 text-center py-12">No products added in the database yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productsList.map((product: any) => {
            // Dynamically resolve lucide icons
            const iconName = product.iconName || "Settings";
            const IconComponent = (LucideIcons as any)[iconName] || Settings;

            return (
              <Link 
                key={product.slug} 
                href={`/products/${product.slug}`}
                className="group p-6 bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-50 text-[#0047b3] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#0047b3] group-hover:text-white transition-colors duration-300">
                  <IconComponent size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-[#0047b3] transition-colors truncate mb-1">
                    {product.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0047b3] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore details</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
