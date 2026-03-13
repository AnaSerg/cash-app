"use client";

import {CategoryItems} from "@/app/categories/compopnents/category-items";
import {DashboardItem} from "@/app/ui/components/dashboard-item";
import {Button} from "@/components/ui/button";
import {DrawerModal} from "@/app/ui/components/drawer-modal";
import {useCategoryApi} from "@/app/categories/hooks/use-category-api";
import {Item, ItemContent, ItemDescription, ItemGroup} from "@/components/ui/item";
import {useState} from "react";
import {CategoryItemProps} from "@/app/categories/types";
import {useExpenseApi} from "@/app/hooks/use-expense-api";
import {useExpenseFields} from "@/app/hooks/use-expense-fields";
import {ProgressBar} from "@/app/ui/components/progress-bar";
import {Calculator} from "@/app/ui/components/calculator/calculator";

export default function HomePage() {
    const { data, error, isLoading } = useCategoryApi();
    console.log(data);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { addExpense } = useExpenseApi();
    const { expenseFormFields } = useExpenseFields();

    if (!data) return null;

    const submitAdd = async (data: CategoryItemProps) => {
        try {
            await addExpense(data);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleAdd = () => {
        setDrawerOpen(true);
    }
  return (
    <div>
      <main className="mt-10 relative mb-20">
          <div className="fixed bottom-0 right-4 left-4 z-20 bg-[linear-gradient(to_top,transparent,#e9e3df_65%)]">
              <Button className="w-full mb-4" size="lg" onClick={handleAdd}>Потратить</Button>
          </div>
          <DashboardItem totals={data.totals}/>
          <DrawerModal
              open={isDrawerOpen}
              onOpenChange={(open) => setDrawerOpen(open)}
              buttonText="Сохранить"
              title="Добавить расход"
              id="expenses"
          >
              <Calculator />
          </DrawerModal>
          <ItemGroup className="grid grid-cols-2 gap-2">
              {data && data.categories.map((category: CategoryItemProps) => {
                  const percent = Math.min((category.totalSpent ? category.totalSpent / category.limit : 0) * 100, 100);

                  return (
                      <Item key={category.id} className="relative overflow-hidden border-0 rounded-2xl p-4 bg-[#f5f4f2]">
                          <ItemContent className="relative z-10 flex flex-col gap-3">

                              <ItemDescription className="text-xs font-semibold uppercase tracking-wide opacity-60">
                                  {category.name}
                              </ItemDescription>

                              <div>
                                  <h2 className="text-2xl font-extrabold text-foreground leading-none">
                                      {category.totalSpent?.toLocaleString()} ₽
                                  </h2>
                                  <p className="text-xs text-muted-foreground mt-1">
                                      из {category.limit.toLocaleString()} ₽
                                  </p>
                              </div>

                              <ProgressBar width={percent} size="small" />

                              <p className="text-xs font-semibold text-muted-foreground">
                                  {category.remaining?.toLocaleString()} ₽ осталось
                              </p>

                          </ItemContent>
                      </Item>
                  );
              })}
          </ItemGroup>
      </main>
    </div>
  );
}
