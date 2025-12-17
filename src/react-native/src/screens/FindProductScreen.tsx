// WhiteLight - Find Me Product Screen (React Native)

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Product } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';
import * as db from '../services/database';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'FindProduct'>;
};

type SearchMode = 'photo' | 'voice' | 'text';

export default function FindProductScreen({ navigation }: Props) {
  const [searchMode, setSearchMode] = useState<SearchMode>('text');
  const [textQuery, setTextQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);

  const handleClose = () => {
    navigation.goBack();
  };

  const handlePhotoSearch = () => {
    // In production, use react-native-image-picker
    Alert.alert(
      'Select Image Source',
      'Choose how you want to add a photo',
      [
        {
          text: 'Camera',
          onPress: () => {
            // launchCamera()
            simulateImageSearch();
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            // launchImageLibrary()
            simulateImageSearch();
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const simulateImageSearch = () => {
    setSelectedImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400');
    performSearch('photo');
  };

  const handleVoiceSearch = () => {
    // In production, use voice recognition library
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceQuery('Wireless headphones under 5000');
      setIsListening(false);
      performSearch('voice', 'Wireless headphones under 5000');
    }, 2000);
  };

  const handleTextSearch = () => {
    if (textQuery.trim()) {
      performSearch('text', textQuery);
    }
  };

  const performSearch = async (mode: SearchMode, query?: string) => {
    try {
      setSearching(true);
      
      // Simulate AI-powered search
      const searchQuery = query || textQuery || 'headphones';
      const results = await db.searchProducts(searchQuery);
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Icon name="x" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Me Product</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Mode Selector */}
        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              searchMode === 'photo' && styles.modeButtonActive,
            ]}
            onPress={() => setSearchMode('photo')}
          >
            <Icon
              name="camera"
              size={24}
              color={searchMode === 'photo' ? colors.background : colors.text.secondary}
            />
            <Text
              style={[
                styles.modeButtonText,
                searchMode === 'photo' && styles.modeButtonTextActive,
              ]}
            >
              Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              searchMode === 'voice' && styles.modeButtonActive,
            ]}
            onPress={() => setSearchMode('voice')}
          >
            <Icon
              name="mic"
              size={24}
              color={searchMode === 'voice' ? colors.background : colors.text.secondary}
            />
            <Text
              style={[
                styles.modeButtonText,
                searchMode === 'voice' && styles.modeButtonTextActive,
              ]}
            >
              Voice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              searchMode === 'text' && styles.modeButtonActive,
            ]}
            onPress={() => setSearchMode('text')}
          >
            <Icon
              name="type"
              size={24}
              color={searchMode === 'text' ? colors.background : colors.text.secondary}
            />
            <Text
              style={[
                styles.modeButtonText,
                searchMode === 'text' && styles.modeButtonTextActive,
              ]}
            >
              Text
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Interface */}
        <View style={styles.searchInterface}>
          {/* Photo Search */}
          {searchMode === 'photo' && (
            <View style={styles.photoSearch}>
              {!selectedImage ? (
                <TouchableOpacity
                  style={styles.photoUpload}
                  onPress={handlePhotoSearch}
                >
                  <Icon name="camera" size={48} color={colors.primary[500]} />
                  <Text style={styles.photoUploadText}>
                    Take or upload a photo
                  </Text>
                  <Text style={styles.photoUploadSubtext}>
                    We'll find similar products for you
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.photoPreview}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.photoImage}
                  />
                  <TouchableOpacity
                    style={styles.photoRemove}
                    onPress={() => setSelectedImage(null)}
                  >
                    <Icon name="x" size={20} color={colors.background} />
                  </TouchableOpacity>
                </View>
              )}

              {selectedImage && (
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={() => performSearch('photo')}
                >
                  <Text style={styles.searchButtonText}>Search</Text>
                  <Icon name="arrow-right" size={20} color={colors.background} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Voice Search */}
          {searchMode === 'voice' && (
            <View style={styles.voiceSearch}>
              <View style={styles.voiceVisualizer}>
                <View
                  style={[
                    styles.micButton,
                    isListening && styles.micButtonActive,
                  ]}
                >
                  <Icon
                    name="mic"
                    size={48}
                    color={isListening ? colors.background : colors.primary[500]}
                  />
                </View>
              </View>

              <Text style={styles.voiceText}>
                {isListening
                  ? 'Listening...'
                  : voiceQuery
                  ? voiceQuery
                  : 'Tap to speak'}
              </Text>

              <TouchableOpacity
                style={styles.voiceButton}
                onPress={handleVoiceSearch}
                disabled={isListening}
              >
                <Icon
                  name={isListening ? 'square' : 'mic'}
                  size={20}
                  color={colors.background}
                />
                <Text style={styles.voiceButtonText}>
                  {isListening ? 'Stop' : 'Start Voice Search'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.voiceHint}>
                Try: "Wireless headphones under 5000" or "Blue running shoes size 10"
              </Text>
            </View>
          )}

          {/* Text Search */}
          {searchMode === 'text' && (
            <View style={styles.textSearch}>
              <View style={styles.textInputContainer}>
                <Icon name="search" size={20} color={colors.text.tertiary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Describe what you're looking for..."
                  value={textQuery}
                  onChangeText={setTextQuery}
                  onSubmitEditing={handleTextSearch}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleTextSearch}
                disabled={!textQuery.trim()}
              >
                <Text style={styles.searchButtonText}>Search</Text>
                <Icon name="arrow-right" size={20} color={colors.background} />
              </TouchableOpacity>

              <View style={styles.suggestions}>
                <Text style={styles.suggestionsTitle}>Try searching for:</Text>
                {[
                  'Wireless headphones',
                  'Running shoes',
                  'Smart watch',
                  'Laptop under 50000',
                ].map((suggestion) => (
                  <TouchableOpacity
                    key={suggestion}
                    style={styles.suggestionChip}
                    onPress={() => {
                      setTextQuery(suggestion);
                      performSearch('text', suggestion);
                    }}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>
              Found {searchResults.length} products
            </Text>

            {searchResults.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.resultCard}
                onPress={() => handleProductPress(product)}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.resultImage}
                />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.resultMeta}>
                    <View style={styles.resultRating}>
                      <Icon name="star" size={14} color={colors.orange[500]} />
                      <Text style={styles.resultRatingText}>
                        {product.rating}
                      </Text>
                    </View>
                    <Text style={styles.resultReviews}>
                      ({product.reviews})
                    </Text>
                  </View>
                  <Text style={styles.resultPrice}>
                    ₹{product.price.toLocaleString()}
                  </Text>
                </View>
                <Icon name="chevron-right" size={20} color={colors.text.tertiary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {searching && (
          <View style={styles.loadingState}>
            <Icon name="loader" size={48} color={colors.primary[500]} />
            <Text style={styles.loadingText}>
              AI is finding the best matches for you...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  modeSelector: {
    flexDirection: 'row',
    padding: spacing.base,
    gap: spacing.md,
    backgroundColor: colors.surface,
  },
  modeButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  modeButtonActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  modeButtonText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: colors.background,
  },
  searchInterface: {
    padding: spacing.base,
  },
  photoSearch: {
    gap: spacing.base,
  },
  photoUpload: {
    aspectRatio: 1,
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.primary[200],
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  photoUploadText: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: spacing.base,
    textAlign: 'center',
  },
  photoUploadSubtext: {
    ...typography.small,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  photoPreview: {
    aspectRatio: 1,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray[200],
  },
  photoRemove: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.red[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green[500],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  searchButtonText: {
    ...typography.button,
    color: colors.background,
  },
  voiceSearch: {
    alignItems: 'center',
    gap: spacing.xl,
    paddingVertical: spacing['3xl'],
  },
  voiceVisualizer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.primary[200],
  },
  micButtonActive: {
    backgroundColor: colors.red[500],
    borderColor: colors.red[300],
  },
  voiceText: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
  },
  voiceButtonText: {
    ...typography.button,
    color: colors.background,
  },
  voiceHint: {
    ...typography.small,
    color: colors.text.tertiary,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  textSearch: {
    gap: spacing.base,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  textInput: {
    ...typography.body,
    flex: 1,
    color: colors.text.primary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  suggestions: {
    marginTop: spacing.base,
  },
  suggestionsTitle: {
    ...typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  suggestionChip: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  suggestionText: {
    ...typography.small,
    color: colors.primary[700],
  },
  resultsSection: {
    padding: spacing.base,
  },
  resultsTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[200],
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultRatingText: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  resultReviews: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  resultPrice: {
    ...typography.h4,
    color: colors.green[600],
  },
  loadingState: {
    alignItems: 'center',
    padding: spacing['4xl'],
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.base,
    textAlign: 'center',
  },
});
