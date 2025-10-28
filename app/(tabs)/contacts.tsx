import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Contacts() {
  const { theme, colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample contacts data
  const contacts = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 8900" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 8901" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 234 567 8902" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "+1 234 567 8903" },
    { id: 5, name: "David Brown", email: "david@example.com", phone: "+1 234 567 8904" },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Contacts</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={wp(8)} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <MaterialIcons name="search" size={wp(6)} color={colors.text} style={{ opacity: 0.5 }} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search contacts..."
          placeholderTextColor={colors.text + "70"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <MaterialIcons name="close" size={wp(6)} color={colors.text} style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Contacts List */}
      <ScrollView 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredContacts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={wp(16)} color={colors.text} style={{ opacity: 0.3 }} />
            <Text style={[styles.emptyText, { color: colors.text, opacity: 0.5 }]}>
              No contacts found
            </Text>
          </View>
        ) : (
          filteredContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarText}>
                  {contact.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={[styles.contactName, { color: colors.text }]}>
                  {contact.name}
                </Text>
                <Text style={[styles.contactEmail, { color: colors.text, opacity: 0.6 }]}>
                  {contact.email}
                </Text>
                <Text style={[styles.contactPhone, { color: colors.text, opacity: 0.6 }]}>
                  {contact.phone}
                </Text>
              </View>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="more-vert" size={wp(6)} color={colors.text} style={{ opacity: 0.5 }} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
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
  addButton: {
    padding: wp(1),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(5),
    marginTop: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: wp(2),
    fontSize: wp(4),
  },
  listContent: {
    padding: wp(5),
    paddingTop: hp(2),
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(3),
  },
  avatarText: {
    color: "#ffffff",
    fontSize: wp(5),
    fontWeight: "bold",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: wp(4),
    fontWeight: "600",
    marginBottom: hp(0.5),
  },
  contactEmail: {
    fontSize: wp(3.5),
    marginBottom: hp(0.2),
  },
  contactPhone: {
    fontSize: wp(3.2),
  },
  actionButton: {
    padding: wp(2),
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(8),
  },
  emptyText: {
    fontSize: wp(4),
    marginTop: hp(2),
  },
});
