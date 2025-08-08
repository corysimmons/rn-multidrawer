import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";


const layouts = [
  {
    name: 'fullscreen',
    title: 'Fullscreen',
    description: 'All drawers cover full screen dimensions (default)',
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
  {
    name: 'sidebar-layout',
    title: 'Sidebar Layout',
    description: 'Left/Right get full height like sidebars, Top/Bottom fit between them',
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
  {
    name: 'header-footer-layout',
    title: 'Header/Footer Layout',
    description: 'Top/Bottom get full width like headers, Left/Right fit between them',
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
  {
    name: 'corner-aware',
    title: 'Corner Aware',
    description: 'All drawers respect each other\'s corners for clean layouts',
    ascii: `┌─┬─────────┬─┐
│ │    T    │ │
├─┼─────────┼─┤
│L│    C    │R│
│L│    C    │R│
│L│    C    │R│
├─┼─────────┼─┤
│ │    B    │ │
└─┴─────────┴─┘`
  }
];


export default function Index() {
  return (
    <ScrollView className="flex-1 bg-gray-100 selectable-text">
      <View className="p-6 pt-16 items-center bg-white border-b border-gray-200 shadow-sm">
        <Text className="text-4xl font-black text-blue-700 mb-3 text-center tracking-tight">MultiDrawer Layouts</Text>
        <Text className="text-lg text-gray-600 text-center font-medium leading-relaxed">
          Explore the {layouts.length} essential drawer layout configurations
        </Text>
      </View>

      <View className="p-6 gap-6">
        {layouts.map((layout) => (
          <Link 
            key={layout.name} 
            href={`/layouts/${layout.name}` as any}
            asChild
          >
            <TouchableOpacity className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-500/10 border border-gray-200 active:scale-95 transition-transform">
              <View className="mb-5">
                <Text className="text-2xl font-black text-gray-800 mb-2 text-center tracking-tight">{layout.title}</Text>
                <Text className="text-sm text-gray-600 leading-6 text-center font-medium">{layout.description}</Text>
              </View>
              
              <View className="bg-gray-50 rounded-xl p-4 mb-5 items-center border border-gray-100">
                <Text className="font-mono text-sm text-gray-800 leading-4 text-center">{layout.ascii}</Text>
              </View>
              
              <View className="flex-row justify-center gap-6 mb-4">
                <View className="flex-row items-center gap-2">
                  <Text className="font-mono text-sm font-bold text-blue-600">L/R/T/B</Text>
                  <Text className="text-sm text-gray-600 font-medium">Drawers</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="font-mono text-sm font-bold text-blue-600">C</Text>
                  <Text className="text-sm text-gray-600 font-medium">Content</Text>
                </View>
              </View>
              
              <Text className="text-base text-blue-600 text-center font-bold">Tap to demo →</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      
    </ScrollView>
  );
}

