import { zodResolver } from "@hookform/resolvers/zod";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";
import { AlertCircle, Plus, Trash2 } from "lucide-react-native";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

import theme from "@/constants/theme";

import { Button } from "@/components/common/button";
import FormField from "@/components/common/form-field";
import { Input } from "@/components/common/input";
import StickyActionBar from "@/components/common/sticky-action-bar";

// Zod schema for validation
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

const agentSettingsSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessWebsite: z
    .string()
    .min(1, "Business website is required")
    .url("Please enter a valid URL (e.g., https://your-website.com)"),
  businessDescription: z.string().optional(),
  services: z.array(serviceSchema),
});

type AgentSettingsForm = z.infer<typeof agentSettingsSchema>;
type Service = z.infer<typeof serviceSchema>;
type ServicePrice = z.infer<typeof servicePriceSchema>;

// Default form values
const DEFAULT_FORM_VALUES: AgentSettingsForm = {
  businessName: "",
  businessWebsite: "",
  businessDescription: "",
  services: [],
};

export default function AgentSettings() {
  const headerHeight = useHeaderHeight();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AgentSettingsForm>({
    resolver: zodResolver(agentSettingsSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const {
    fields: services,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  // Service management
  function addService() {
    router.push("/settings/add-service");
  }

  function handleRemoveService(serviceIndex: number) {
    Alert.alert("Remove Service", "Are you sure you want to remove this service?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removeService(serviceIndex),
      },
    ]);
  }

  // Form actions
  async function onSubmit(data: AgentSettingsForm) {
    try {
      // TODO: Call API to save settings
      console.log("Saving form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      Alert.alert("Success", "Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      Alert.alert("Error", "Failed to save settings. Please try again.");
    }
  }

  function handleReset() {
    Alert.alert("Reset Settings", "Are you sure you want to reset all settings? This will clear all unsaved changes.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => reset(DEFAULT_FORM_VALUES),
      },
    ]);
  }

  function renderService({ item: service, index: serviceIndex }: { item: Service; index: number }) {
    return (
      <ServiceCard
        serviceIndex={serviceIndex}
        control={control}
        errors={errors}
        onRemove={() => handleRemoveService(serviceIndex)}
      />
    );
  }

  function keyExtractor(item: Service, index: number) {
    return `${item.id}-${index}`;
  }

  return (
    <>
      <ScrollView
        style={[styles.scrollContainer]}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Controller
          control={control}
          name="businessName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Business Name"
              required
              placeholder="Enter your business name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.businessName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="businessWebsite"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Business Website"
              required
              placeholder="https://your-website.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="url"
              autoCapitalize="none"
              error={errors.businessWebsite?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="businessDescription"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Business Description"
              placeholder="Tell us about your business..."
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
          <View style={styles.servicesHeader}>
            <Text style={styles.sectionTitle}>Services & Pricing</Text>
            <TouchableOpacity onPress={addService} style={styles.addServiceButton}>
              <Plus size={16} color={theme.colors.primary} />
              <Text style={styles.addServiceText}>Add Service</Text>
            </TouchableOpacity>
          </View>

          {services.length === 0 ? (
            <View style={styles.emptyServices}>
              <AlertCircle size={24} color={theme.colors.mutedForeground} />
              <Text style={styles.emptyServicesText}>No services added yet</Text>
              <Text style={styles.emptyServicesHint}>
                Add your first service to help customers understand what you offer.
              </Text>
            </View>
          ) : (
            <FlatList
              data={services}
              renderItem={renderService}
              keyExtractor={keyExtractor}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {/* Add bottom padding to account for action bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Action Bar */}
      <StickyActionBar>
        <Button variant="outline" onPress={handleReset} style={styles.actionButton} disabled={!isDirty || isSubmitting}>
          Reset
        </Button>
        <Button
          variant="default"
          onPress={handleSubmit(onSubmit)}
          style={styles.actionButton}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </StickyActionBar>
    </>
  );
}

// Service Card Component
interface ServiceCardProps {
  serviceIndex: number;
  control: any;
  errors: any;
  onRemove: () => void;
}

function ServiceCard({ serviceIndex, control, errors, onRemove }: ServiceCardProps) {
  const {
    fields: prices,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control,
    name: `services.${serviceIndex}.prices`,
  });

  function addPriceToService() {
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
      Alert.alert("Cannot Remove", "Each service must have at least one price.");
    }
  }

  const serviceErrors = errors.services?.[serviceIndex];

  return (
    <View style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>Service</Text>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Trash2 size={16} color={theme.colors.destructive} />
        </TouchableOpacity>
      </View>

      <Controller
        control={control}
        name={`services.${serviceIndex}.title`}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Service title (e.g., Deep Tissue Massage)"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.serviceInput}
            variant={serviceErrors?.title ? "error" : "default"}
          />
        )}
      />
      {serviceErrors?.title && <Text style={styles.errorText}>{serviceErrors.title.message}</Text>}

      <Controller
        control={control}
        name={`services.${serviceIndex}.description`}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Service description (optional)"
            value={value || ""}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={2}
            style={[styles.serviceInput, styles.multilineInput]}
            textAlignVertical="top"
          />
        )}
      />

      <View style={styles.pricesSection}>
        <View style={styles.pricesHeader}>
          <Text style={styles.pricesTitle}>Pricing Tiers</Text>
          <TouchableOpacity onPress={addPriceToService} style={styles.addPriceButton}>
            <Plus size={14} color={theme.colors.primary} />
            <Text style={styles.addPriceText}>Add Tier</Text>
          </TouchableOpacity>
        </View>

        {prices.map((price, priceIndex) => (
          <View key={price.id} style={styles.priceRow}>
            <Controller
              control={control}
              name={`services.${serviceIndex}.prices.${priceIndex}.name`}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Tier name (e.g., 60 min)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={[styles.priceInput, styles.priceNameInput]}
                  variant={serviceErrors?.prices?.[priceIndex]?.name ? "error" : "default"}
                />
              )}
            />
            <Controller
              control={control}
              name={`services.${serviceIndex}.prices.${priceIndex}.price`}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="$0"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  style={[styles.priceInput, styles.pricePriceInput]}
                  variant={serviceErrors?.prices?.[priceIndex]?.price ? "error" : "default"}
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
        {serviceErrors?.prices && (
          <Text style={styles.errorText}>
            {typeof serviceErrors.prices === "string" ? serviceErrors.prices : "Please fix the errors in pricing tiers"}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formSection: {
    // marginBottom: 24,
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
  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addServiceButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addServiceText: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.primary,
  },
  emptyServices: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
  },
  emptyServicesText: {
    fontSize: 16,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.mutedForeground,
    marginTop: 8,
    marginBottom: 4,
  },
  emptyServicesHint: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.mutedForeground,
    textAlign: "center",
    lineHeight: 16,
  },
  serviceCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: theme.colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
  },
  removeButton: {
    padding: 4,
  },
  serviceInput: {
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Geist",
    color: theme.colors.destructive,
    marginTop: 4,
    marginLeft: 4,
  },
  pricesSection: {
    marginTop: 8,
  },
  pricesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  pricesTitle: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: theme.colors.text,
  },
  addPriceButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addPriceText: {
    fontSize: 12,
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
  actionButton: {
    flex: 1,
  },
  bottomPadding: {
    height: 80,
  },
});
