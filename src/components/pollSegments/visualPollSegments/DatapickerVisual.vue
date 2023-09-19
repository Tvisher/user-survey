<template>
  <VueDatePicker
    locale="ru"
    :auto-apply="true"
    :enable-time-picker="false"
    :range="isRangeDatapicker"
    v-model="date"
    :format="'dd.MM.yyyy'"
    :placeholder="getCurrentDate"
  ></VueDatePicker>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  props: {
    dateData: { type: Object },
  },
  data() {
    return {
      date: null,
    };
  },
  computed: {
    isRangeDatapicker() {
      return this.dateData.range;
    },
    getCurrentDate() {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.dp__input {
  width: 100%;
  padding: 12px;
  padding-left: 45px;
  border-radius: 4px;
  border: 1px solid #c2cfe0;
  background: #fff;
  color: #262b31;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  outline: none;
  transition: border-color 0.3s ease-in-out;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1122_53468)'%3e%3cpath d='M19 2H18.5V1.5C18.5 1.10218 18.342 0.720644 18.0607 0.43934C17.7794 0.158035 17.3978 0 17 0V0C16.6022 0 16.2206 0.158035 15.9393 0.43934C15.658 0.720644 15.5 1.10218 15.5 1.5V2H9.5V1.5C9.5 1.10218 9.34196 0.720644 9.06066 0.43934C8.77936 0.158035 8.39782 0 8 0V0C7.60218 0 7.22064 0.158035 6.93934 0.43934C6.65804 0.720644 6.5 1.10218 6.5 1.5V2H6C4.54131 2 3.14236 2.57946 2.11091 3.61091C1.07946 4.64236 0.5 6.04131 0.5 7.5L0.5 18.5C0.5 19.9587 1.07946 21.3576 2.11091 22.3891C3.14236 23.4205 4.54131 24 6 24H19C20.4587 24 21.8576 23.4205 22.8891 22.3891C23.9205 21.3576 24.5 19.9587 24.5 18.5V7.5C24.5 6.04131 23.9205 4.64236 22.8891 3.61091C21.8576 2.57946 20.4587 2 19 2ZM19 21H6C5.33696 21 4.70107 20.7366 4.23223 20.2678C3.76339 19.7989 3.5 19.163 3.5 18.5V10H21.5V18.5C21.5 19.163 21.2366 19.7989 20.7678 20.2678C20.2989 20.7366 19.663 21 19 21Z' fill='%23004269' fill-opacity='0.28'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1122_53468'%3e%3crect width='24' height='24' fill='white' transform='translate(0.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: left 12px center;
}
.dp__input_wrap .dp__input_icon {
  display: none;
}

.dp__active_date,
.dp__range_end,
.dp__range_start,
.dp__active_date,
.dp__overlay_cell_active {
  background-color: var(--app-color);
}
.dp__range_between {
  border-radius: 0% !important;
}
.dp__range_start {
  border-radius: 50% 0% 0% 50% !important;
}
.dp__range_end {
  border-radius: 0% 50% 50% 0% !important;
}
.dp__cell_inner {
  border-radius: 50%;
}
.dp__today {
  border-color: var(--app-color);
}
.dp__menu_inner {
  padding: 30px;
}

.dp__calendar_header_item {
  color: rgba(0, 32, 51, 0.3);
  text-align: center;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 13px */
}
</style>
