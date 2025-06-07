import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqQuestion}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.questionText}>{question}</Text>
        {isExpanded ? (
          <ChevronUp size={20} color="#666" />
        ) : (
          <ChevronDown size={20} color="#666" />
        )}
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.faqAnswer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const HelpCategory = ({ title, items }) => (
  <View style={styles.category}>
    <Text style={styles.categoryTitle}>{title}</Text>
    {items.map((item, index) => (
      <FAQItem
        key={index}
        question={item.question}
        answer={item.answer}
      />
    ))}
  </View>
);

export default function HelpScreen() {
  const router = useRouter();

  const faqCategories = [
    {
      title: 'Getting Started',
      items: [
        {
          question: 'How do I create an account?',
          answer: 'To create an account, download the app and follow the registration process. You\'ll need to provide your email address, create a password, and verify your identity.',
        },
        {
          question: 'How do I add money to my wallet?',
          answer: 'You can add money to your wallet by linking a bank account or adding a debit/credit card. Go to the Wallet section and tap "Add Money" to get started.',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          question: 'How secure is my money?',
          answer: 'Your money is protected by bank-level security measures, including encryption and fraud monitoring. We also offer additional security features like Face ID and PIN protection.',
        },
        {
          question: 'What should I do if I lose my phone?',
          answer: 'If you lose your phone, immediately contact our support team. We can help you secure your account and transfer your funds to a new device.',
        },
      ],
    },
    {
      title: 'Payments',
      items: [
        {
          question: 'How do I send money?',
          answer: 'To send money, tap the "Send" button on the home screen, enter the recipient\'s details and amount, then confirm the transaction.',
        },
        {
          question: 'Are there any fees for sending money?',
          answer: 'Most transactions are free. However, some special services may have associated fees, which will be clearly displayed before you confirm the transaction.',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <Text style={styles.searchPlaceholder}>Search for help</Text>
      </View>

      <ScrollView style={styles.content}>
        {faqCategories.map((category, index) => (
          <HelpCategory
            key={index}
            title={category.title}
            items={category.items}
          />
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => router.push('/profile/contact')}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  category: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#172e73',
    marginRight: 8,
  },
  faqAnswer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  answerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
  },
  contactSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#172e73',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
}); 