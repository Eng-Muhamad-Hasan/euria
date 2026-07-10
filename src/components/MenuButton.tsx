import { Colors, Fonts } from "@/constants/theme";
import More_Horiz from "@expo/material-symbols/more_horiz.xml";
import Archive_Icon from "@expo/material-symbols/work_history.xml";
import Location_Icon from "@expo/material-symbols/globe_location_pin.xml";
import {
  DropdownMenu,
  DropdownMenuItem,
  Host,
  Icon,
  IconButton,
  Text,
} from "@expo/ui/jetpack-compose";
import { useState } from "react";
import { StyleSheet } from "react-native";
export default function MenuButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Host matchContents>
      <DropdownMenu
        expanded={isExpanded}
        onDismissRequest={() => setIsExpanded(false)}
      >
        <DropdownMenu.Trigger >
          <Host matchContents>
            <IconButton onClick={() => setIsExpanded(true)}>
              <Icon
                source={More_Horiz}
                size={24}
                tint={Colors.dark}
                contentDescription="More_Horiz"
              />
            </IconButton>
          </Host>
        </DropdownMenu.Trigger>
      
        <DropdownMenu.Items >
          <DropdownMenuItem
            enabled
            elementColors={{}}
            onClick={() => setIsExpanded(false)}
          >
            <DropdownMenuItem.LeadingIcon>
              <Icon
                source={Archive_Icon}
                size={24}
                tint={Colors.pureWhite}
                contentDescription="Orders Archive"
              />
            </DropdownMenuItem.LeadingIcon>
            <DropdownMenuItem.Text>
              <Text style={styles.itemText}>Orders Archive</Text>
            </DropdownMenuItem.Text>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsExpanded(false)}>
            <DropdownMenuItem.LeadingIcon>
              <Icon
                source={Location_Icon}
                size={24}
                tint={Colors.pureWhite}
                contentDescription="Restaurant Location"
              />
            </DropdownMenuItem.LeadingIcon>
            <DropdownMenuItem.Text>
              <Text style={styles.itemText}>View on map</Text>
            </DropdownMenuItem.Text>
          </DropdownMenuItem>
        </DropdownMenu.Items>
      </DropdownMenu>
    </Host>
  );
}

const styles = StyleSheet.create({
  itemText: {
    color:Colors.pureWhite,
    fontFamily:Fonts.brandSemiBold
  },
});
