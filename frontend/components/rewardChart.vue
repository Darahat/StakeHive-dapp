<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium">Staking Performance</h3>
      <button 
        @click="refreshData"
        class="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
      >
        Refresh Data
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
      <VueApexCharts 
         type="line" 
        height="350" 
        :options="chartOptions" 
        :series="series"
        class="w-full"
      />
   
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
  wallet: {
    type: Object,
    required: true,
  },
});

const loading = ref(true);
const hasData = ref(false);
const localHistory = ref([]);

const chartOptions = {
  chart: {
    id: 'staking-chart',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  colors: ['#6366F1', '#10B981'],
  stroke: {
    width: [3, 3],
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    labels: {
      formatter: function(value) {
        const date = new Date(value);
        return date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
    }
  },
  yaxis: {
    labels: {
      formatter: function(value) {
        return parseFloat(value).toFixed(2) + ' HIVE';
      }
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function(value) {
        return parseFloat(value).toFixed(6) + ' HIVE';
      }
    }
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'right'
  },
  grid: {
    borderColor: '#f1f1f1'
  }
};

// Debug watchers
watch(localHistory, (newVal) => {
  console.log('localHistory updated:', newVal);
  if (newVal.length) {
   
  }
}, { deep: true });

const series = computed(() => {
  console.log('Computing series with history:', localHistory.value);
  
  if (!localHistory.value || !localHistory.value.length) {
    hasData.value = false;
    return [];
  }

  const rewardData = [];
  const stakeData = [];
  let cumulativeStake = 0;

  const sortedHistory = [...localHistory.value].sort((a, b) => a.timestamp - b.timestamp);

  sortedHistory.forEach((entry, index) => {
    const amount = parseFloat(entry.amount);
    let timestamp = parseInt(entry.timestamp);

    // Convert to milliseconds if in seconds
    timestamp = timestamp < 10000000000 ? timestamp * 1000 : timestamp;

    if (isNaN(timestamp)) {
      console.warn('Invalid timestamp at index', index, entry);
      return;
    }

    switch (entry.type) {
      case 'stake':
        // cumulativeStake += amount;
        stakeData.push({ x: timestamp, y: amount });
        break;
      case 'unstake':
        // cumulativeStake -= amount;
        stakeData.push({ x: timestamp, y: amount * -1 });
        break;
        case 'reward':
        console.log(`Reward at index ${index}:`, {
      amount,
      timestamp,
      date: new Date(timestamp).toISOString()
    });
        rewardData.push({ x: timestamp, y: amount });
        break;
    }
  });

  hasData.value = stakeData.length > 0 || rewardData.length > 0;
  console.log('Raw localHistory:', localHistory.value);

  console.log('Processed data:', {
    stakeData,
    rewardData
  });

  return [
    { 
      name: 'Staked Amount', 
      data: stakeData,
      color: '#6366F1'
    },
     
  ];
});

async function loadData() {
  try {
    loading.value = true;
    console.log('Loading staking history...');
    await props.wallet.loadStakingHistory();
    localHistory.value = props.wallet.stakingHistory || [];
    console.log('Loaded history:', localHistory.value);
  } catch (error) {
    console.error('Error loading data:', error);
    localHistory.value = [];
  } finally {
    loading.value = false;
  }
}

const refreshData = async () => {
  console.log('Manual refresh triggered');
  await loadData();
};

// Initial load
onMounted(loadData);

// Watch for account changes
watch(() => props.wallet.account, (newAccount) => {
  if (newAccount) {
    console.log('Account changed, reloading data...');
    loadData();
  }
});
</script>