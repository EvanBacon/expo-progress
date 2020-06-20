import React from 'react';
import { Button, Text, Switch, StyleSheet, View } from 'react-native';

import * as Progress from './build';

export default function App() {
  const [value, setValue] = React.useState(0.5);
  const [animated, setAnimated] = React.useState(true);
  const [useImage, setUseImage] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        padding: 48,
        justifyContent: 'center',
      }}
    >
      <Progress.Bar
        isIndeterminate={indeterminate}
        isAnimated={animated}
        progress={value}
        trackImage={
          useImage
            ? {
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCK35yfBkAl0Q2O-sVduL7DhEOA74aNN5Oc9ehTarDC43sCMmU&usqp=CAU',
              }
            : undefined
        }
        style={{ width: '100%', marginTop: 12 }}
      />
      <View style={{ marginTop: 48 }}>
        <TitleSwitch
          value={animated}
          onValueChange={setAnimated}
          title="Animated"
        />
        <TitleSwitch
          value={indeterminate}
          onValueChange={setIndeterminate}
          title="Indeterminate"
        />
        <TitleSwitch
          value={useImage}
          onValueChange={setUseImage}
          title="Use Image"
        />
        <Button onPress={() => setValue((value + 0.1) % 1)} title="Add 10%" />
      </View>
    </View>
  );
}

function TitleSwitch({
  style,
  titleStyle,
  title,
  value,
  onValueChange,
  disabled,
}) {
  const outputTitle = disabled ? `${title} (Disabled)` : title;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{outputTitle}</Text>
      <Switch
        disabled={disabled}
        value={value}
        onValueChange={value => onValueChange(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  title: {
    marginRight: 12,
  },
  text: {
    marginVertical: 15,
    maxWidth: '80%',
    marginHorizontal: 10,
  },
});
