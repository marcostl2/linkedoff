<template>
  <l-map
    ref="map"
    style="height: 200px; width: 100%"
    :zoom="16"
    :options="{ scrollWheelZoom: 'center' }"
    :center="[company.latitude, company.longitude]"
    @ready="repaintMap"
  >
    <l-tile-layer
      :url="`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${getToken}`"
    />
    <l-marker :lat-lng="[company.latitude, company.longitude]">
      <l-tooltip :options="tooltipOptions">
        <div style="height: 30px; background: white">
          <h2>Localização da empresa {{ company.name }}</h2>
        </div>
      </l-tooltip>
    </l-marker>
  </l-map>
</template>

<script>
export default {
  props: {
    company: { type: Object, required: true },
  },
  data() {
    return {
      tooltipOptions: {
        direction: "top",
        offset: [this.company.latitude, this.company.longitude],
      },
    };
  },
  computed: {
    getToken() {
      return process.env.NUXT_APP_MAPBOX_TOKEN;
    },
  },
  methods: {
    repaintMap() {
      this.$nextTick(() => {
        this.$refs.map.mapObject.invalidateSize();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
