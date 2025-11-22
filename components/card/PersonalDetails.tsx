import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTheme } from "@/context/ThemeContext";
import { useCardCreate } from "@/context/CardCreateContext";

const PersonalDetails = () => {
  const { colors } = useTheme();
  const { cardData, updatePersonal, addAccreditation, removeAccreditation } = useCardCreate();

  const p = cardData.personal;

  const [showMiddleName, setShowMiddleName] = useState(false);
  const [showPrefix, setShowPrefix] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);
  const [showPronoun, setShowPronoun] = useState(false);
  const [showPreferredName, setShowPreferredName] = useState(false);
  const [showMaidenName, setShowMaidenName] = useState(false);

  const [accreditationInput, setAccreditationInput] = useState("");

  const optionalButtons = useMemo(
    () => [
      { key: "middleName", label: "+ Middle name", state: showMiddleName, setState: setShowMiddleName },
      { key: "prefix", label: "+ Prefix", state: showPrefix, setState: setShowPrefix },
      { key: "suffix", label: "+ Suffix", state: showSuffix, setState: setShowSuffix },
      { key: "pronoun", label: "+ Pronoun", state: showPronoun, setState: setShowPronoun },
      { key: "preferredName", label: "+ Preferred name", state: showPreferredName, setState: setShowPreferredName },
      { key: "maidenName", label: "+ Maiden name", state: showMaidenName, setState: setShowMaidenName },
    ],
    [showMiddleName, showPrefix, showSuffix, showPronoun, showPreferredName, showMaidenName]
  );

  const onAddAccreditation = () => {
    const trimmed = accreditationInput.trim();
    if (!trimmed) return;
    addAccreditation(trimmed);
    setAccreditationInput("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>

      {/* First + Last name */}
      <View style={styles.row2}>
        <TextInput
          value={p.firstName}
          onChangeText={(t) => updatePersonal("firstName", t)}
          placeholder="First name"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.input, { borderColor: colors.text, color: colors.text }]}
        />
        <TextInput
          value={p.lastName}
          onChangeText={(t) => updatePersonal("lastName", t)}
          placeholder="Last name"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.input, { borderColor: colors.text, color: colors.text }]}
        />
      </View>

      {/* Optional toggle buttons */}
      <View style={styles.optionalWrap}>
        {optionalButtons.map(btn => (
          <TouchableOpacity
            key={btn.key}
            onPress={() => btn.setState(!btn.state)}
            style={[styles.optionalBtn, { borderColor: colors.text }]}
            activeOpacity={0.8}
          >
            <Text style={{ color: colors.text, fontSize: wp(3.2), fontWeight: "600" }}>
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Optional fields */}
      {showMiddleName && (
        <TextInput
          value={p.middleName || ""}
          onChangeText={(t) => updatePersonal("middleName", t)}
          placeholder="Middle name"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
        />
      )}

      {showPrefix && (
        <TextInput
          value={p.prefix || ""}
          onChangeText={(t) => updatePersonal("prefix", t)}
          placeholder="Prefix (Mr / Mrs / Dr...)"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
        />
      )}

      {showSuffix && (
        <TextInput
          value={p.suffix || ""}
          onChangeText={(t) => updatePersonal("suffix", t)}
          placeholder="Suffix (Jr / Sr...)"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
        />
      )}

      {showPronoun && (
        <TextInput
          value={p.pronoun || ""}
          onChangeText={(t) => updatePersonal("pronoun", t)}
          placeholder="Pronoun (he/him, she/her...)"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
        />
      )}

      {showPreferredName && (
        <TextInput
          value={p.preferredName || ""}
          onChangeText={(t) => updatePersonal("preferredName", t)}
          placeholder="Preferred name"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
        />
      )}

      {showMaidenName && (
        <TextInput
          value={p.maidenName || ""}
          onChangeText={(t) => updatePersonal("maidenName", t)}
          placeholder="Maiden name"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
        />
      )}

      {/* Job info */}
      <TextInput
        value={p.jobTitle}
        onChangeText={(t) => updatePersonal("jobTitle", t)}
        placeholder="Job title"
        placeholderTextColor={colors.mutedText || "#999"}
        style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
      />

      <TextInput
        value={p.department}
        onChangeText={(t) => updatePersonal("department", t)}
        placeholder="Department"
        placeholderTextColor={colors.mutedText || "#999"}
        style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
      />

      <TextInput
        value={p.company}
        onChangeText={(t) => updatePersonal("company", t)}
        placeholder="Company"
        placeholderTextColor={colors.mutedText || "#999"}
        style={[styles.inputFull, { borderColor: colors.text, color: colors.text }]}
      />

      <TextInput
        value={p.headline}
        onChangeText={(t) => updatePersonal("headline", t)}
        placeholder="Headline"
        placeholderTextColor={colors.mutedText || "#999"}
        style={[styles.inputFull, styles.textArea, { borderColor: colors.text, color: colors.text }]}
        multiline
      />

      {/* Accreditation */}
      <Text style={[styles.subTitle, { color: colors.text }]}>Accreditations</Text>

      <View style={styles.accreditationRow}>
        <TextInput
          value={accreditationInput}
          onChangeText={setAccreditationInput}
          placeholder="Add accreditation"
          placeholderTextColor={colors.mutedText || "#999"}
          style={[styles.input, { flex: 1, borderColor: colors.text, color: colors.text }]}
        />
        <TouchableOpacity
          onPress={onAddAccreditation}
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
        >
          <Text style={{ color: colors.background, fontWeight: "700" }}>Add</Text>
        </TouchableOpacity>
      </View>

      {p.accreditations?.length ? (
        <View style={styles.accreditationList}>
          {p.accreditations.map((a, idx) => (
            <View key={`${a}-${idx}`} style={[styles.accreditationItem, { borderColor: colors.text }]}>
              <Text style={{ color: colors.text, flex: 1 }}>{a}</Text>
              <TouchableOpacity onPress={() => removeAccreditation(idx)}>
                <Text style={{ color: "red", fontWeight: "700" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
    gap: hp(1.2),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: "700",
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  row2: {
    flexDirection: "row",
    gap: wp(2),
  },

  input: {
    width: "50%",
    height: hp("5.5%"),
    minHeight: 42,
    maxHeight: 52,
    borderWidth: 1,
    borderRadius: wp(2.5),
    paddingHorizontal: wp(3),
    fontSize: wp(3.5),
  },

  inputFull: {
    width: "100%",
    height: hp("5.5%"),
    minHeight: 42,
    maxHeight: 52,
    borderWidth: 1,
    borderRadius: wp(2.5),
    paddingHorizontal: wp(3),
    fontSize: wp(3.5),
  },

  textArea: {
    height: hp("9%"),
    maxHeight: hp("12%"),
    paddingVertical: hp(1),
    textAlignVertical: "top",
  },

  optionalWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp(2),
  },

  optionalBtn: {
    borderWidth: 1,
    borderRadius: wp(10),
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
  },

  subTitle: {
    marginTop: hp(1),
    fontSize: wp(4),
    fontWeight: "700",
  },

  accreditationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },

  addBtn: {
    paddingHorizontal: wp(4),
    height: hp("5.5%"),
    minHeight: 42,
    maxHeight: 52,
    borderRadius: wp(2.5),
    alignItems: "center",
    justifyContent: "center",
  },

  accreditationList: {
    gap: hp(0.8),
  },

  accreditationItem: {
    borderWidth: 1,
    borderRadius: wp(2.5),
    padding: wp(3),
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
});