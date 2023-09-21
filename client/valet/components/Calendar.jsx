
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
// import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from 'react';
import {Calendar, Agenda, Timeline, TimelineList, CalendarUtils, CalendarProvider, ExpandableCalendar} from 'react-native-calendars';

export default ValetCalendar = () => {

  const [selected, setSelected] = useState(new Date())
  console.log('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Agenda
        items={{
          '2023-09-20': [{name: 'Daniel Park', car: 'Blue Toyota', license: 'DCBA321', start_time:'7:30pm', end_time:'10pm', initials:'DP' }, {name: 'Amelia Li', car: 'Black GMC', license: '321ABCD', start_time:'6:30pm', end_time:'8:30pm', initials:'AL' }],
          '2023-09-22': [],
          '2023-09-21': [{name: 'Amelia Li', car: 'Black GMC', license: '321ABCD', start_time:'6:30pm', end_time:'8:30pm', initials:'AL' }],

        }}
        markedDates={{
          '2012-05-16': {selected: true, marked: true},
          '2012-05-17': {marked: true},
          '2012-05-18': {disabled: true}
        }}
        showOnlySelectedDayItems={true}
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        renderItem={(item, firstItemInDay) => {
          return (
          <View style={styles.itemView}>
            <View>
              <Text style={styles.time}>{item.start_time}-{item.end_time}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.car}>{item.car}</Text>
              <Text style={styles.license}>{item.license}</Text>
            </View>
            <View>
              <View style={[styles.circle, {backgroundColor: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}]}>
                <Text style={styles.initials}>{item.initials}</Text>
              </View>
            </View>
          </View>
          )
        }}
        selected={selected}
        showClosingKnob={true}
        renderEmptyData={() =>
          <View style={styles.noResView}>
            <Text style={styles.noResText}>
              No Reservations Today
            </Text>
          </View>}
        style={{}}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  noResView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noResText: {
    fontSize: 25
  },
  itemView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 120,
    borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    borderColor: 'gray',
    paddingLeft: 50,
    marginBottom: 10
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  car: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  license: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  circle: {
    // backgroundColor: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  initials: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
    },
  }
})