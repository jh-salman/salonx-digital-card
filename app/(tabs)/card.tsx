import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Alert,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { supabase } from "../../lib/supabase";

export default function Card() {
  const { colors } = useTheme();
  const router = useRouter();

  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    try {
      setLoading(true);

      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userRes.user) {
        setCards([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("cards")
        .select("id,title,selected_color,selected_layout_id,personal,created_at")
        .eq("user_id", userRes.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setCards(data || []);
    } catch (e: any) {
      console.log("Fetch cards error:", e?.message);
      Alert.alert("Error", e?.message || "Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleEdit = (card: any) => {
    router.push({
      pathname: "/create-card",
      params: { cardId: card.id }, // create-card page e eta diye prefill korba
    });
  };

  const handleShare = async (card: any) => {
    try {
      const p = card.personal || {};
      const name = p.firstName
        ? `${p.firstName} ${p.lastName || ""}`.trim()
        : card.title || "My Card";

      const headline = p.headline ? `\n${p.headline}` : "";
      const text = `${name}${headline}\n\nShared from SalonX`;

      await Share.share({ message: text });
    } catch (e: any) {
      console.log("Share error:", e?.message);
    }
  };

  const renderCardTitle = (card: any) => {
    const p = card.personal || {};
    const fullName = [p.prefix, p.firstName, p.middleName, p.lastName, p.suffix]
      .map((x: string) => (x || "").trim())
      .filter(Boolean)
      .join(" ");

    return fullName || card.title || "Untitled Card";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Cards
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={styles.settingsButton}
        >
          <MaterialIcons
            name="settings"
            size={wp(6)}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.text, marginTop: hp(1) }}>
            Loading cards...
          </Text>
        </View>
      ) : (
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
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                {/* Card header row */}
                <View style={styles.cardHeaderRow}>
                  <Text
                    style={[styles.cardTitle, { color: colors.primary }]}
                    numberOfLines={1}
                  >
                    {renderCardTitle(card)}
                  </Text>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      onPress={() => handleEdit(card)}
                      style={styles.actionBtn}
                    >
                      <Feather
                        name="edit-2"
                        size={wp(4.8)}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleShare(card)}
                      style={styles.actionBtn}
                    >
                      <Feather
                        name="share-2"
                        size={wp(4.8)}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* headline */}
                <Text
                  style={[styles.cardText, { color: colors.text }]}
                  numberOfLines={3}
                >
                  {card?.personal?.headline || "No headline yet"}
                </Text>

                {/* open preview */}
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/preview-card",
                      params: { cardId: card.id },
                    })
                  }
                  style={[styles.previewBtn, { borderColor: colors.primary }]}
                >
                  <Text style={{ color: colors.primary, fontWeight: "700" }}>
                    Open Preview
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

          {/* Empty state */}
          {cards.length === 0 && (
            <View style={[styles.emptyCard, { borderColor: colors.border }]}>
              <Text style={{ color: colors.text, fontSize: wp(4) }}>
                No cards yet.
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/create-card")}
                style={[
                  styles.emptyCreateBtn,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={{ color: colors.background, fontWeight: "700" }}
                >
                  Create your first card
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Create New Card */}
          <TouchableOpacity
            style={[styles.createCard, { borderColor: colors.primary }]}
            onPress={() => router.push("/create-card")}
          >
            <MaterialIcons
              name="add-circle-outline"
              size={wp(10)}
              color={colors.primary}
            />
            <Text style={[styles.createText, { color: colors.primary }]}>
              Create a New Card
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
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
    paddingBottom: hp(2),
    flexDirection: "row",
  },

  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: wp(2),
  },

  cardTitle: {
    fontSize: wp(5.3),
    fontWeight: "bold",
    flex: 1,
  },

  cardActions: {
    flexDirection: "row",
    gap: wp(2),
  },

  actionBtn: {
    padding: wp(1),
  },

  cardText: {
    fontSize: wp(4),
    lineHeight: hp(3),
    marginTop: hp(1),
  },

  previewBtn: {
    marginTop: hp(2),
    borderWidth: 1,
    borderRadius: wp(2.5),
    paddingVertical: hp(0.8),
    alignItems: "center",
  },

  emptyCard: {
    width: wp(70),
    padding: wp(5),
    borderRadius: wp(3),
    marginRight: wp(4),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: hp(1.5),
  },

  emptyCreateBtn: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: wp(3),
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