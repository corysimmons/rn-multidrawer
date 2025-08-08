import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Drawer, DrawerProvider, useDrawer } from "../../../src";
import type { DrawerLayout } from "../../../src/types";
import CustomSyntaxHighlighter from '../../components/CustomSyntaxHighlighter';

const layoutInfo: Record<string, {
  title: string;
  description: string;
  ascii: string;
}> = {
  'fullscreen': {
    title: 'Fullscreen Layout',
    description: 'All drawers cover the full screen dimensions (default)',
    ascii: `┌─────────────┐
│TL T  T  T TR│
├─┬─────────┬─┤
│L│    C    │R│
│L│    C    │R│
│L│    C    │R│
├─┴─────────┴─┤
│BL B  B  B BR│
└─────────────┘`
  },
  'sidebar-layout': {
    title: 'Sidebar Layout',
    description: 'Left/Right drawers get full height like sidebars, Top/Bottom fit between them',
    ascii: `┌─┬─────────┬─┐
│L│    T    │R│
│L├─────────┤R│
│L│    C    │R│
│L│    C    │R│
│L│    C    │R│
│L├─────────┤R│
│L│    B    │R│
└─┴─────────┴─┘`
  },
  'header-footer-layout': {
    title: 'Header/Footer Layout',
    description: 'Top/Bottom drawers get full width like headers, Left/Right fit between them',
    ascii: `┌─────────────┐
│ T  T  T  T  │
├─┬─────────┬─┤
│ │    C    │ │
│L│    C    │R│
│ │    C    │ │
├─┴─────────┴─┤
│ B  B  B  B  │
└─────────────┘`
  },
  'corner-aware': {
    title: 'Corner Aware Layout',
    description: 'All drawers respect each other\'s corners for clean, non-overlapping layouts',
    ascii: `┌─┬─────────┬─┐
│L│    T    │R│
├─┼─────────┼─┤
│L│    C    │R│
│L│    C    │R│
│L│    C    │R│
├─┼─────────┼─┤
│L│    B    │R│
└─┴─────────┴─┘`
  }
};

const codeExamples = {
  fullscreen: `import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      {/* Your main content */}
      <View className="flex-1 bg-white">
        <Text>Main Content</Text>
      </View>

      {/* Left drawer - new JSX children pattern */}
      <Drawer side="left" hitboxSize={50}>
        <View className="flex-1 bg-blue-100 p-4">
          <Text>Left Drawer Content</Text>
        </View>
      </Drawer>

      {/* Or use function children for access to props */}
      <Drawer side="right" hitboxSize={50}>
        {({ width, height, close }) => (
          <View className="flex-1 bg-green-100 p-4">
            <Text>Size: {width}x{height}</Text>
            <Button title="Close" onPress={close} />
          </View>
        )}
      </Drawer>
    </DrawerProvider>
  );
}`,

  'sidebar-layout': `import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider options={{ layout: "sidebar-layout" }}>
      <View className="flex-1 bg-white">
        <Text>Main Content Area</Text>
      </View>

      {/* Full-height sidebar */}
      <Drawer side="left" hitboxSize={50}>
        {() => (
          <View className="flex-1 bg-slate-100 p-4">
            <Text>Navigation Panel</Text>
            <Text>Menu Items...</Text>
          </View>
        )}
      </Drawer>

      {/* Top toolbar fits between sidebars */}
      <Drawer side="top" hitboxSize={50}>
        {({ height }) => (
          <View style={{ height: height/2 }} 
                className="bg-blue-100 p-4">
            <Text>Toolbar Content</Text>
          </View>
        )}
      </Drawer>
    </DrawerProvider>
  );
}`,

  'header-footer-layout': `import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider options={{ layout: "header-footer-layout" }}>
      <View className="flex-1 bg-white">
        <Text>Content Area</Text>
      </View>

      {/* Full-width header */}
      <Drawer side="top" hitboxSize={50}>
        {({ height }) => (
          <View style={{ height: height/2 }} 
              className="bg-blue-500 p-4">
            <Text className="text-white">App Header</Text>
            <Text className="text-white">Navigation Bar</Text>
          </View>
        )}
      </Drawer>

      {/* Sidebar fits between header/footer */}
      <Drawer side="left" hitboxSize={50}>
        {() => (
          <View className="flex-1 bg-gray-100 p-4">
            <Text>Side Panel</Text>
          </View>
        )}
      </Drawer>

      {/* Full-width footer */}
      <Drawer side="bottom" hitboxSize={50}>
        {({ height }) => (
          <View style={{ height: height/2 }} 
              className="bg-gray-800 p-4">
            <Text className="text-white">Footer Tools</Text>
          </View>
        )}
      </Drawer>
    </DrawerProvider>
  );
}`,

  'corner-aware': `import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider options={{ layout: "corner-aware" }}>
      <View className="flex-1 bg-white">
        <Text>Clean Content Area</Text>
      </View>

      {/* All drawers respect corners */}
      <Drawer side="left" hitboxSize={50}>
        {() => (
          <View className="flex-1 bg-blue-50 p-4">
            <Text>Left Panel</Text>
          </View>
        )}
      </Drawer>

      <Drawer side="top" hitboxSize={50}>
        {({ height }) => (
          <View style={{ height: height/2 }} 
              className="bg-green-50 p-4">
            <Text>Header (no corners)</Text>
          </View>
        )}
      </Drawer>

      <Drawer side="right" hitboxSize={50}>
        {() => (
          <View className="flex-1 bg-purple-50 p-4">
            <Text>Right Panel</Text>
          </View>
        )}
      </Drawer>

      <Drawer side="bottom" hitboxSize={50}>
        {({ height }) => (
          <View style={{ height: height/2 }} 
              className="bg-orange-50 p-4">
            <Text>Footer (no corners)</Text>
          </View>
        )}
      </Drawer>
    </DrawerProvider>
  );
}`
};

const copyToClipboard = async (text: string) => {
  try {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Code copied to clipboard");
  } catch {
    Alert.alert("Error", "Failed to copy to clipboard");
  }
};

const CodeBlock = ({ code }: { code: string }) => (
  <View className="bg-slate-800 rounded-lg border border-slate-600 mb-4">
    <View className="flex-row justify-between items-center p-3 pb-2">
      <Text className="text-xs text-slate-400">React Native / TypeScript</Text>
      <TouchableOpacity
        className="flex-row items-center gap-1 bg-slate-700 px-2 py-1 rounded"
        onPress={() => copyToClipboard(code)}
      >
        <Ionicons name="copy-outline" size={14} color="#94a3b8" />
        <Text className="text-xs text-slate-400">Copy</Text>
      </TouchableOpacity>
    </View>
    <View className="px-3 pb-3">
      <CustomSyntaxHighlighter
        language="javascript"
        fontSize={12}
      >
        {code}
      </CustomSyntaxHighlighter>
    </View>
  </View>
);

const DrawerControlsSection: React.FC = () => {
  const { openDrawerAnimated, closeDrawerAnimated, isDrawerOpen } = useDrawer();

  const toggleDrawer = (side: 'left' | 'top' | 'right' | 'bottom') => {
    if (isDrawerOpen(side)) {
      closeDrawerAnimated(side);
    } else {
      openDrawerAnimated(side);
    }
  };

  return (
    <View className="bg-white rounded-xl p-5 mb-6 w-full border border-blue-200 shadow-md shadow-blue-500/10">
      <Text className="text-lg text-blue-700 text-center font-semibold leading-relaxed mb-4">
        🎮 Drawer Controls
      </Text>
      <View className="flex-row flex-wrap justify-center gap-2">
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-lg shadow-sm"
          onPress={() => toggleDrawer('left')}
        >
          <Text className="text-white font-semibold text-sm">← Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-600 px-4 py-2 rounded-lg shadow-sm"
          onPress={() => toggleDrawer('top')}
        >
          <Text className="text-white font-semibold text-sm">↑ Top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-purple-600 px-4 py-2 rounded-lg shadow-sm"
          onPress={() => toggleDrawer('right')}
        >
          <Text className="text-white font-semibold text-sm">Right →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-orange-600 px-4 py-2 rounded-lg shadow-sm"
          onPress={() => toggleDrawer('bottom')}
        >
          <Text className="text-white font-semibold text-sm">↓ Bottom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LeftDrawerContent: React.FC = () => {
  const { closeDrawerAnimated } = useDrawer();

  return (
    <View className="flex-1 bg-white shadow-lg shadow-blue-500/20">
      <View className="absolute right-0 top-0 w-60 h-full justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800">Left Drawer</Text>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-lg mt-4"
          onPress={() => closeDrawerAnimated('left')}
        >
          <Text className="text-white font-semibold">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RightDrawerContent: React.FC = () => {
  const { closeDrawerAnimated } = useDrawer();

  return (
    <View className="flex-1 bg-white shadow-lg shadow-blue-500/20">
      <View className="absolute left-0 top-0 w-60 h-full justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800">Right Drawer</Text>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-lg mt-4"
          onPress={() => closeDrawerAnimated('right')}
        >
          <Text className="text-white font-semibold">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TopDrawerContent: React.FC<{ height: number }> = ({ height }) => {
  const { closeDrawerAnimated } = useDrawer();
  const visibleSize = height / 2;

  return (
    <View className="absolute bottom-0 left-0 w-full bg-white shadow-lg shadow-blue-500/20 justify-center items-center" style={{ height: visibleSize }}>
      <Text className="text-2xl font-bold text-gray-800">Top Drawer</Text>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg mt-4"
        onPress={() => closeDrawerAnimated('top')}
      >
        <Text className="text-white font-semibold">Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const BottomDrawerContent: React.FC<{ height: number }> = ({ height }) => {
  const { closeDrawerAnimated } = useDrawer();
  const visibleSize = height / 2;

  return (
    <View className="absolute top-0 left-0 w-full bg-white shadow-lg shadow-blue-500/20 justify-center items-center" style={{ height: visibleSize }}>
      <Text className="text-2xl font-bold text-gray-800">Bottom Drawer</Text>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg mt-4"
        onPress={() => closeDrawerAnimated('bottom')}
      >
        <Text className="text-white font-semibold">Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function LayoutDemo() {
  const { layout } = useLocalSearchParams<{ layout: string }>();
  const layoutName = layout as DrawerLayout;
  const info = layoutInfo[layoutName];

  if (!info) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <View className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-500/10 border border-gray-200">
          <Text className="text-lg text-red-600 mb-5 text-center font-semibold">Layout not found: {layout}</Text>
          <Link href="/" asChild>
            <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 border border-blue-500">
              <Text className="text-white font-bold text-base text-center">← Back to Layouts</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <DrawerProvider options={{ layout: layoutName }}>
      {/* Main Content */}
      <ScrollView className="flex-1 bg-gray-100 selectable-text" contentContainerStyle={{ padding: 24, paddingTop: 40, paddingBottom: 40 }}>
        <View className="items-center max-w-2xl w-full mx-auto selectable-text">
          <Text className="text-4xl font-black text-blue-700 mb-3 text-center tracking-tight">{info.title}</Text>
          <Text className="text-lg text-gray-700 text-center mb-6 leading-relaxed font-medium">{info.description}</Text>

          <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg shadow-blue-500/10 border border-gray-200 w-full">
            <Text className="font-mono text-base text-gray-800 leading-5 text-center">{info.ascii}</Text>
          </View>

          <DrawerControlsSection />

          {/* Code Examples */}
          <View className="bg-slate-900 rounded-xl p-4 mb-8 w-full border border-slate-700 shadow-md shadow-slate-500/10">
            <Text className="text-lg text-slate-100 font-bold mb-4 text-center">💻 Code Example</Text>

            {layoutName === 'fullscreen' && (
              <View>
                <Text className="text-xs text-slate-400 mb-2">Default layout - no configuration needed:</Text>
                <CodeBlock code={codeExamples.fullscreen} />
              </View>
            )}

            {layoutName === 'sidebar-layout' && (
              <View>
                <Text className="text-xs text-slate-400 mb-2">Left/Right sidebars with full height:</Text>
                <CodeBlock code={codeExamples['sidebar-layout']} />
              </View>
            )}

            {layoutName === 'header-footer-layout' && (
              <View>
                <Text className="text-xs text-slate-400 mb-2">Full-width headers with fitted sidebars:</Text>
                <CodeBlock code={codeExamples['header-footer-layout']} />
              </View>
            )}

            {layoutName === 'corner-aware' && (
              <View>
                <Text className="text-xs text-slate-400 mb-2">Clean grid layout with no overlapping:</Text>
                <CodeBlock code={codeExamples['corner-aware']} />
              </View>
            )}
          </View>

          <Link href="/" asChild>
            <TouchableOpacity className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 active:scale-95 transition-transform border border-blue-500">
              <Text className="text-white font-bold text-lg text-center">← Back to Layouts</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      {/* Left Drawer - using JSX children (new pattern) */}
      <Drawer
        side="left"
        hitboxSize={50}
        snapOpenThreshold={0.3}
      >
        <LeftDrawerContent />
      </Drawer>

      {/* Right Drawer - using JSX children (new pattern) */}
      <Drawer
        side="right"
        hitboxSize={50}
        snapOpenThreshold={0.3}
      >
        <RightDrawerContent />
      </Drawer>

      {/* Top Drawer - using function children for props access */}
      <Drawer
        side="top"
        hitboxSize={50}
        snapOpenThreshold={0.3}
        bounciness={1.2}
        className="bg-white"
      >
        {({ height }) => <TopDrawerContent height={height} />}
      </Drawer>

      {/* Bottom Drawer - using function children for props access */}
      <Drawer
        side="bottom"
        hitboxSize={50}
        snapOpenThreshold={0.3}
      >
        {({ height }) => <BottomDrawerContent height={height} />}
      </Drawer>
    </DrawerProvider>
  );
}

