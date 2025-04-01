import multiprocessing
import time

def cpu_stress_test():
    while True:
        pass  # İşlemciyi sürekli meşgul edecek bir döngü

if __name__ == "__main__":
    num_cores = multiprocessing.cpu_count()  # Mevcut işlemci çekirdek sayısını al
    print(f"Başlatılıyor: {num_cores} çekirdek kullanılacak.")
    
    processes = []
    for _ in range(num_cores):
        p = multiprocessing.Process(target=cpu_stress_test)
        p.start()
        processes.append(p)
    
    try:
        while True:
            time.sleep(5)  # Ana işlem devam etsin
    except KeyboardInterrupt:
        print("Sonlandırılıyor...")
        for p in processes:
            p.terminate()
            p.join()
        print("Tüm işlemler sonlandırıldı.")
