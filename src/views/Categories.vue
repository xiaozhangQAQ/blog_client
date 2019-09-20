<template>
  <div class="cateories">
    cateories
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
import ResizeMixin from '@/mixins/ResizeHandler.js'

export default {
  name: 'cateories',
  components: {
    
  },
  computed:{
    ...mapState([
      'isMobile'
    ])
  },
  mixins: [ResizeMixin],
  mounted:function () {
    
  }
}
</script>
