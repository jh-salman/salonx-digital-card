import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Card() {
  const { theme, colors } = useTheme();
  const router = useRouter();

  // Dummy cards (replace with actual data later)
  const cards = [
    {
      id: 1,
      title: "Card 1",
      description: "Card 1 description",
    },
    {
      id: 2,
      title: "Card 2",
      description: "Card 2 description",
    },
    {
      id: 3,
      title: "Card 3",
      description: "Card 3 description",
    },
    {
      id: 4,
      title: "Card 4",
      description: "Card 4 description",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Cards</Text>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.settingsButton}>
          <MaterialIcons name="settings" size={wp(6)} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Card List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {/* Existing Cards */}
        {cards.length > 0 &&
          cards.map((card) => (
            <View
              key={card.id}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Text style={[styles.cardTitle, { color: colors.primary }]}>{card.title}</Text>
              <Text style={[styles.cardText, { color: colors.text }]}>{card.description}</Text>
            </View>
          ))}

        {/* Create New Card */}
        <TouchableOpacity
          style={[styles.createCard, { borderColor: colors.primary }]}
          onPress={() => router.push("/create-card")}
        >
          <MaterialIcons name="add-circle-outline" size={wp(10)} color={colors.primary} />
          <Text style={[styles.createText, { color: colors.primary }]}>Create a New Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingTop: hp(6),
    paddingBottom: hp(2),
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: wp(7),
    fontWeight: "bold",
  },
  settingsButton: {
    padding: wp(1),
  },
  scrollContent: {
    padding: wp(5),
    paddingTop: hp(2.5),
    flexDirection: "row",
  },
  card: {
    width: wp(70),
    padding: wp(5),
    borderRadius: wp(3),
    marginRight: wp(4),
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: wp(5.5),
    fontWeight: "bold",
    marginBottom: hp(1.5),
  },
  cardText: {
    fontSize: wp(4),
    lineHeight: hp(3),
  },
  createCard: {
    width: wp(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(3),
    borderWidth: 2,
    borderStyle: "dashed",
    marginRight: wp(4),
    paddingVertical: hp(8),
  },
  createText: {
    marginTop: hp(2),
    fontSize: wp(4.5),
    fontWeight: "600",
  },
});