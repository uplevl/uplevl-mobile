import { zodResolver } from "@hookform/resolvers/zod";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";
import { Plus, Trash2 } from "lucide-react-native";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

import theme from "@/constants/theme";

import ActionBar from "@/components/common/action-bar";
import { Button } from "@/components/common/button";
import FormField from "@/components/common/form-field";
import { Input } from "@/components/common/input";
import StyledView from "@/components/common/styled-view";

// Zod schemas for validation
const servicePriceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Price tier name is required"),
  price: z.string().min(1, "Price is required"),
});

const serviceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Service title is required"),
  description: z.string().optional(),
  prices: z.array(servicePriceSchema).min(1, "At least one price tier is required"),
});

type ServiceForm = z.infer<typeof serviceSchema>;
type ServicePrice = z.infer<typeof servicePriceSchema>;

// Default form values
const DEFAULT_FORM_VALUES: ServiceForm = {
  id: Date.now().toString(),
  title: "",
  description: "",
  prices: [{ id: Date.now().toString(), name: "Standard", price: "" }],
};

export default function AddService() {
  const headerHeight = useHeaderHeight();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const {
    fields: prices,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control,
    name: "prices",
  });

  function addPriceTier() {
    const newPrice: ServicePrice = {
      id: Date.now().toString(),
      name: "",
      price: "",
    };
    appendPrice(newPrice);
  }

  function handleRemovePrice(priceIndex: number) {
    if (prices.length > 1) {
      removePrice(priceIndex);
    } else {
      Alert.alert("Cannot Remove", "Each service must have at least one price tier.");
    }
  }

  function handleCancel() {
    if (isDirty) {
      Alert.alert("Discard Changes", "Are you sure you want to discard your changes?", [
        { text: "Keep Editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]);
    } else {
      router.back();
    }
  }

  async function onSubmit(data: ServiceForm) {
    try {
      // TODO: Pass the service data back to the parent screen
      // For now, we'll just log it and close the modal
      console.log("New service data:", data);

      // Close the modal
      router.back();

      Alert.alert("Success", "Service added successfully!");
    } catch (error) {
      console.error("Failed to add service:", error);
      Alert.alert("Error", "Failed to add service. Please try again.");
    }
  }

  return (
    <StyledView>
      <ScrollView
        style={[styles.scrollContainer, { paddingTop: headerHeight }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Service Title"
              required
              placeholder="Service title (e.g., Deep Tissue Massage)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Service Description"
              placeholder="Describe your service..."
              value={value || ""}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              style={styles.multilineInput}
              textAlignVertical="top"
            />
          )}
        />

        <View style={styles.formSection}>
          <View style={styles.pricesHeader}>
            <Text style={styles.sectionTitle}>Pricing Tiers</Text>
            <TouchableOpacity onPress={addPriceTier} style={styles.addPriceButton}>
              <Plus size={16} color={theme.colors.primary} />
              <Text style={styles.addPriceText}>Add Tier</Text>
            </TouchableOpacity>
          </View>

          {prices.map((price, priceIndex) => (
            <View key={price.id} style={styles.priceRow}>
              <Controller
                control={control}
                name={`prices.${priceIndex}.name`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Tier name (e.g., 60 min)"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[styles.priceInput, styles.priceNameInput]}
                    variant={errors.prices?.[priceIndex]?.name ? "error" : "default"}
                  />
                )}
              />
              <Controller
                control={control}
                name={`prices.${priceIndex}.price`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="$0"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    style={[styles.priceInput, styles.pricePriceInput]}
                    variant={errors.prices?.[priceIndex]?.price ? "error" : "default"}
                  />
                )}
              />
              {prices.length > 1 && (
                <TouchableOpacity onPress={() => handleRemovePrice(priceIndex)} style={styles.removePriceButton}>
                  <Trash2 size={14} color={theme.colors.destructive} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          {errors.prices && (
            <Text style={styles.errorText}>
              {typeof errors.prices === "string" ? errors.prices : "Please fix the errors in pricing tiers"}
            </Text>
          )}
        </View>

        {/* Add bottom padding to account for action bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Action Bar */}
      <ActionBar>
        <Button variant="outline" onPress={handleCancel} style={styles.actionButton}>
          Cancel
        </Button>
        <Button variant="default" onPress={handleSubmit(onSubmit)} style={styles.actionButton} disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Service"}
        </Button>
      </ActionBar>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
    marginBottom: 16,
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  pricesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addPriceButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addPriceText: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.primary,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  priceInput: {
    marginBottom: 0,
  },
  priceNameInput: {
    flex: 2,
  },
  pricePriceInput: {
    flex: 1,
  },
  removePriceButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.destructive,
    marginTop: 4,
    marginLeft: 4,
  },
  actionButton: {
    flex: 1,
  },
  bottomPadding: {
    height: 80,
  },
});
