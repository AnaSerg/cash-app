"use client";

import {CategoryItems} from "@/app/categories/compopnents/category-items";
import {DashboardItem} from "@/app/ui/components/dashboard-item";
import {Button} from "@/components/ui/button";
import {DrawerModal} from "@/app/ui/components/drawer-modal";
import Form, {FormField} from "@/app/ui/components/form";
import {useCategoryApi} from "@/app/categories/hooks/use-category-api";
import {Item, ItemContent, ItemDescription, ItemGroup} from "@/components/ui/item";
import {useState} from "react";
import {CategoryItemProps} from "@/app/categories/types";
import {useExpenseApi} from "@/app/hooks/use-expense-api";
import {useExpenseFields} from "@/app/hooks/use-expense-fields";

const savingsFormFields: FormField[] = [
    {
        name: "sum",
        type: "number",
        required: true,
        placeholder: "0"
    }
]

export default function HomePage() {
    const { categories, error, isLoading } = useCategoryApi();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { addExpense } = useExpenseApi();
    const { expenseFormFields } = useExpenseFields();

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
      <main className="mt-10 relative">
          <div className="grid grid-cols-2 gap-3 fixed top-3 right-4 left-4">
          </div>
          <DashboardItem />
          <Button className="w-full" onClick={handleAdd}>Потратить</Button>
          <DrawerModal
              open={isDrawerOpen}
              onOpenChange={(open) => setDrawerOpen(open)}
              buttonText="Сохранить"
              title="Добавить расход"
              id="expenses"
          >
              <Form
                  id="expenses"
                  submit={submitAdd}
                  formFields={expenseFormFields}
                  defaultValues={{ expense: "" }}
              />
          </DrawerModal>
          <ItemGroup className="grid grid-cols-3 gap-2">
              {categories && categories.map((category: CategoryItemProps) => {
                  const percent = Math.min((category.totalSpent  ? category.totalSpent / category.limit : 0) * 100, 100);

                  return (
                      <Item key={category.id} variant="muted" className="relative overflow-hidden">
                          <div
                              className={`absolute bottom-0 left-0 right-0 transition-all duration-500 bg-[#D7D5D1]`}
                              style={{ height: `${percent}%` }}
                          />
                          <ItemContent className="relative z-10">
                              <ItemDescription className="text-center">{category.name}</ItemDescription>
                              <h2 className="font-medium text-lg text-center">{category.remaining} ₽</h2>
                              <p className="font-medium text-sm text-center text-muted-foreground">{category.totalSpent} ₽ / {category.limit} ₽</p>
                          </ItemContent>
                      </Item>
                  );
              })}
          </ItemGroup>
      </main>
    </div>
  );
}
