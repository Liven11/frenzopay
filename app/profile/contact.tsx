import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Phone, MessageSquare } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ContactScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
  });

  const handleSubmit = () => {
    if (!formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would typically send the support request
    Alert.alert(
      'Success',
      'Your message has been sent. We\'ll get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Mail size={20} color="#172e73" />
            <Text style={styles.contactText}>{formData.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone size={20} color="#172e73" />
            <Text style={styles.contactText}>{formData.phone}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              value={formData.subject}
              onChangeText={(text) => setFormData({ ...formData, subject: text })}
              placeholder="What's your issue about?"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              placeholder="Describe your issue in detail"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <MessageSquare size={20} color="white" />
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.supportInfo}>
          <Text style={styles.supportTitle}>Support Hours</Text>
          <Text style={styles.supportText}>Monday - Friday: 9:00 AM - 6:00 PM</Text>
          <Text style={styles.supportText}>Saturday: 10:00 AM - 4:00 PM</Text>
          <Text style={styles.supportText}>Sunday: Closed</Text>
        </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contactInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#172e73',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
  supportInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  supportTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginBottom: 12,
  },
  supportText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
}); 