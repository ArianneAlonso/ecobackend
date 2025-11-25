import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Leaf, 
  Trash2, 
  Recycle, 
  Package, 
  AlertCircle, 
  Lightbulb, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const tips = [
  "Separa tus residuos desde el origen para facilitar el reciclaje",
  "Lava los envases antes de reciclarlos",
  "Reduce el uso de plásticos de un solo uso",
  "Reutiliza bolsas y contenedores cuando sea posible",
  "Composta tus residuos orgánicos en casa",
];

const wasteTypes = [
  {
    title: "Residuos Orgánicos",
    icon: Leaf,
    color: "#16a34a",
    bgColor: "#dcfce7",
    description: "Restos de comida, cáscaras, residuos de jardín",
    examples: ["Frutas y verduras", "Restos de café y té", "Cáscaras de huevo", "Hojas y ramas"],
  },
  {
    title: "Residuos Inorgánicos",
    icon: Package,
    color: "#2563eb",
    bgColor: "#dbeafe",
    description: "Plásticos, vidrio, metales, papel y cartón",
    examples: ["Botellas plásticas", "Latas de aluminio", "Papel y cartón", "Vidrio"],
  },
  {
    title: "Residuos Sanitarios",
    icon: AlertCircle,
    color: "#dc2626",
    bgColor: "#fee2e2",
    description: "Pañales, toallas sanitarias, materiales médicos",
    examples: ["Pañales desechables", "Toallas sanitarias", "Gasas y vendajes", "Mascarillas usadas"],
  },
];

const containers = [
  {
    name: "Contenedor Verde",
    materials: ["Plástico", "Vidrio", "Papel", "Cartón"],
    color: "#9ccc65",
  },
  {
    name: "Contenedor Marrón",
    materials: ["Residuos orgánicos", "Restos de comida"],
    color: "#b45309",
  },
  {
    name: "Contenedor Gris",
    materials: ["Residuos sanitarios", "No reciclables"],
    color: "#4b5563",
  },
];

const threeRs = [
  {
    title: "Reducir",
    icon: Lightbulb,
    description: "Minimiza la cantidad de residuos que generas",
    tips: [
      "Compra productos con menos empaque",
      "Evita productos desechables",
      "Planifica tus compras para evitar desperdicios",
      "Usa bolsas reutilizables",
    ],
  },
  {
    title: "Reutilizar",
    icon: Recycle,
    description: "Dale una segunda vida a los objetos",
    tips: [
      "Usa frascos de vidrio para almacenar",
      "Repara objetos en lugar de desecharlos",
      "Dona lo que ya no uses",
      "Convierte ropa vieja en trapos de limpieza",
    ],
  },
  {
    title: "Reciclar",
    icon: Trash2,
    description: "Transforma los residuos en nuevos productos",
    tips: [
      "Separa correctamente tus residuos",
      "Limpia los envases antes de reciclar",
      "Aplasta las botellas para ahorrar espacio",
      "Consulta qué materiales se reciclan en tu zona",
    ],
  },
];

const compostSteps = [
  {
    step: "1",
    title: "Elige el contenedor",
    description: "Usa un contenedor con tapa, puede ser comercial o casero, con agujeros para ventilación",
  },
  {
    step: "2",
    title: "Agrega materiales verdes",
    description: "Restos de frutas, verduras, café, té y cáscaras de huevo (ricos en nitrógeno)",
  },
  {
    step: "3",
    title: "Agrega materiales marrones",
    description: "Hojas secas, ramas pequeñas, papel sin tinta (ricos en carbono)",
  },
  {
    step: "4",
    title: "Mantén la humedad",
    description: "El compost debe estar húmedo como una esponja exprimida, no empapado",
  },
  {
    step: "5",
    title: "Mezcla regularmente",
    description: "Revuelve cada 1-2 semanas para oxigenar y acelerar la descomposición",
  },
  {
    step: "6",
    title: "Espera y cosecha",
    description: "En 2-6 meses tendrás compost listo, oscuro y con olor a tierra",
  },
];

export default function Tips() {
  const navigation = useNavigation();
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consejos Ecológicos</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Quick Tips Card */}
        <LinearGradient
          colors={['#f1f8e9', '#e8f5e9']}
          style={styles.quickTipsCard}
        >
          <View style={styles.quickTipsHeader}>
            <View style={styles.quickTipsIcon}>
              <Lightbulb size={24} color="#9ccc65" />
            </View>
            <Text style={styles.quickTipsTitle}>Consejos Rápidos</Text>
          </View>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </LinearGradient>

        {/* Waste Types Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trash2 size={20} color="#333" />
            <Text style={styles.sectionTitle}>Tipos de Residuos</Text>
          </View>

          {wasteTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <View key={type.title} style={styles.wasteCard}>
                <View style={styles.wasteCardContent}>
                  <View style={[styles.wasteIcon, { backgroundColor: type.bgColor }]}>
                    <IconComponent size={24} color={type.color} />
                  </View>
                  <View style={styles.wasteInfo}>
                    <Text style={styles.wasteTitle}>{type.title}</Text>
                    <Text style={styles.wasteDescription}>{type.description}</Text>
                    <View style={styles.examplesContainer}>
                      {type.examples.map((example) => (
                        <View key={example} style={styles.exampleBadge}>
                          <Text style={styles.exampleText}>{example}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Container Types Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Package size={20} color="#333" />
            <Text style={styles.sectionTitle}>Tipos de Contenedores</Text>
          </View>

          {containers.map((container) => (
            <View key={container.name} style={styles.containerCard}>
              <View style={styles.containerHeader}>
                <View style={[styles.containerDot, { backgroundColor: container.color }]} />
                <Text style={styles.containerName}>{container.name}</Text>
              </View>
              <View style={styles.materialsContainer}>
                {container.materials.map((material) => (
                  <View key={material} style={styles.materialBadge}>
                    <Text style={styles.materialText}>{material}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Three Rs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Recycle size={20} color="#333" />
            <Text style={styles.sectionTitle}>Las 3 Rs del Reciclaje</Text>
          </View>

          {threeRs.map((r, index) => {
            const IconComponent = r.icon;
            const isExpanded = expandedAccordion === index;
            return (
              <View key={index} style={styles.accordionCard}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => toggleAccordion(index)}
                  activeOpacity={0.7}
                >
                  <View style={styles.accordionTitleContainer}>
                    <View style={styles.accordionIcon}>
                      <IconComponent size={20} color="#9ccc65" />
                    </View>
                    <View style={styles.accordionTitleContent}>
                      <Text style={styles.accordionTitle}>{r.title}</Text>
                      <Text style={styles.accordionDescription}>{r.description}</Text>
                    </View>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={20} color="#666" />
                  ) : (
                    <ChevronDown size={20} color="#666" />
                  )}
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.accordionContent}>
                    {r.tips.map((tip, tipIndex) => (
                      <View key={tipIndex} style={styles.accordionTip}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.accordionTipText}>{tip}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Compost Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Leaf size={20} color="#333" />
            <Text style={styles.sectionTitle}>Cómo Hacer Compost en Casa</Text>
          </View>

          <View style={styles.compostCard}>
            <Text style={styles.compostIntro}>
              El compostaje es una forma natural de reciclar residuos orgánicos y crear abono rico en nutrientes para tus plantas.
            </Text>
            {compostSteps.map((item) => (
              <View key={item.step} style={styles.compostStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Environmental Impact Card */}
        <LinearGradient
          colors={['#e8f5e9', '#f1f8e9']}
          style={styles.impactCard}
        >
          <View style={styles.impactHeader}>
            <BookOpen size={24} color="#9ccc65" />
            <Text style={styles.impactTitle}>Impacto Ambiental</Text>
          </View>
          <Text style={styles.impactIntro}>
            Reciclar correctamente puede marcar una gran diferencia en nuestro planeta:
          </Text>
          {[
            "Reduce la contaminación del aire y agua",
            "Ahorra energía y recursos naturales",
            "Disminuye los residuos en vertederos",
            "Ayuda a combatir el cambio climático",
          ].map((item, index) => (
            <View key={index} style={styles.impactItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.impactText}>{item}</Text>
            </View>
          ))}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  quickTipsCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  quickTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickTipsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(156, 204, 101, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickTipsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    color: '#9ccc65',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  wasteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wasteCardContent: {
    flexDirection: 'row',
  },
  wasteIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  wasteInfo: {
    flex: 1,
  },
  wasteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  wasteDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  exampleBadge: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  exampleText: {
    fontSize: 11,
    color: '#666',
  },
  containerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  containerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  containerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  materialBadge: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  materialText: {
    fontSize: 11,
    color: '#666',
  },
  accordionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accordionTitleContent: {
    flex: 1,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  accordionDescription: {
    fontSize: 13,
    color: '#666',
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingLeft: 68,
  },
  accordionTip: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  accordionTipText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  compostCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compostIntro: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
    lineHeight: 18,
  },
  compostStep: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9ccc65',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  impactCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  impactIntro: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18,
  },
  impactItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  impactText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
});